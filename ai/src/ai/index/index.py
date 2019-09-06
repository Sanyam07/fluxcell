from annoy import AnnoyIndex

from pathlib import Path
import pickle

import numpy as np
import pandas as pd

from uuid import uuid4


class RollingIndex:

    def __init__(self, 
                 label=str(uuid4()), 
                 dim = 200, 
                 metric='angular',
                 n_trees = 20,
                 delta =  100):

        # set parameters
        self._label = label
        self._dim = dim
        self._metric = metric
        self._n_trees = n_trees
        self._delta = delta

        self._main_index = ImmutableIndex(
                items = [], vectors = [],
                label = self._label + '-main',
                dim = self._dim,
                metric = self._metric,
                n_trees = self._n_trees
            )

        self._temp_index = ImmutableIndex(
                items = [], vectors = [],
                label = self._label + '-temp',
                dim = self._dim,
                metric = self._metric,
                n_trees = self._n_trees
            )

    def add(self, item, vector):
        
        # unpack old temp index
        items, vectors = self._temp_index.unpack()
        # add new stuff
        items += [item]
        vectors += [vector]
        # rebuild temp index
        self._temp_index = ImmutableIndex(
                items = items, vectors = vectors,
                label = self._label + '-temp',
                dim = self._dim,
                metric = self._metric,
                n_trees = self._n_trees
            )
        # if delta reached, rebuild main index
        if not self._temp_index.size() % self._delta:
            self._rebuild()
                                             
    def _rebuild(self):

        self._main_index = self._main_index + self._temp_index
        self._temp_index = ImmutableIndex(
                items = [], vectors = [],
                label = self._label + '-temp',
                dim = self._dim,
                metric = self._metric,
                n_trees = self._n_trees
            )

    def query(self, vector, n_results=25):

        main_results, main_distances = self._main_index.query(vector, n_results)
        temp_results, temp_distances = self._temp_index.query(vector, n_results)

        results, distances = merge_results(main_results, main_distances,
                                           temp_results, temp_distances,
                                           n_results)

        return results, distances

class ImmutableIndex:

    def __init__(self, items, vectors,
                 label=str(uuid4()), 
                 dim = 200, 
                 metric='angular',
                 n_trees = 20,
                 persist=True):

        # set parameters
        self._label = label
        self._dim = dim
        self._metric = metric
        self._n_trees = n_trees

        # initialize mapping and index
        self._index = AnnoyIndex(dim, metric)
        self._mapping = []
        
        base_path = '/store/ai/index/'
        self._index_path = base_path + label + '-index'
        self._mapping_path = base_path + label + '-mapping'

        # load data from files if cache exists
        index_path_exists = Path(self._index_path).is_file()
        mapping_path_exists = Path(self._mapping_path).is_file()
        
        if index_path_exists and mapping_path_exists and persist:
            # load index from file
            self._index.load(self._index_path)
            # load mapping from file
            mapping_stream = open(self._mapping_path, 'rb')
            self._mapping = pickle.load(mapping_stream)
        else:
            # check parameters are consistent
            assert len(vectors) == len(items)
            # construct index and mapping
            for item_id in range(len(items)):
                self._index.add_item(item_id, vectors[item_id])
            self._index.build(self._n_trees)
            self._mapping = items
            if persist:
                # save index and mapping to file
                self._index.save(self._index_path)
                mapping_stream = open(self._mapping_path, 'wb')
                pickle.dump(self._mapping, mapping_stream)

    def size(self):

        size = len(self._mapping)

        return size

    def query(self, vector, n_results):

        raw_results, distances = self._index.get_nns_by_vector(
                vector, n_results,
                include_distances=True
            )
        results = [self._mapping[r] for r in raw_results]

        return results, distances

    def unpack(self):

        vectors = []
        for item_id in range(self.size()):
            vectors.append(
                self._index.get_item_vector(item_id)
            )
        mapping = self._mapping

        return mapping, vectors

    def __add__(self, other):

        #TODO - add checks that self and other are compatible

        own_mapping, own_vectors = self.unpack()
        other_mapping, other_vectors = other.unpack()

        new_mapping = own_mapping + other_mapping
        new_vectors = own_vectors + other_vectors

        return ImmutableIndex(new_mapping, new_vectors, self._label,
                              self._dim, self._metric, self._n_trees)


def merge_results(first_results, first_distances,
                  second_results, second_distances,
                  n_results):

    # sort combined results by distance
    distances, results = tuple(zip(*sorted(zip(
        first_distances+second_distances,
        first_results+second_results
    ))))

    # return only the top n results & distances as lists
    return list(results[:n_results]), list(distances[:n_results])
