from annoy import AnnoyIndex
#from faiss import IndexFlatL2, IndexIDMap

from pathlib import Path

import numpy as np
import pandas as pd


class JointIndexMap:

    def __init__(self, dim, name, dexer):

        self.dexer = dexer(dim=dim, name=name, persist=True)

    def add(self, sentence):
        pass


class AnnoyIndexMap:

    def __init__(self, dim, name=None, persist=False):

        self.dim = dim
        self.name = name
        self.persist = persist
        self.index = AnnoyIndex(dim)
        self.table = pd.DataFrame(columns=['sentence'])
        self.counter = 0
        self.build_increment = 100
        base_path = '/store/ai/annoyindex'
        if name:
            self.file = base_path + '-' + name
        else:
            self.file = base_path

        if persist:
            if Path(self.file).is_file():
                self.index.load(self.file)

    def __del__(self):

        if self.persist:
            self.index.build(10)
            self.save()

    def _increment(self):

        self.counter += 1
        self.index.build(10)

    def add(self, sentence):

        nextId = self.counter
        df = self.table
        self.table = df.append(
          pd.Series({'sentence': sentence}, name=nextId),
          ignore_index=True
        )
        vec = sentence.embedding.numpy()[0]
        self.index.add_item(nextId, vec)

        self._increment()

    def search(self, query, k=5):

        query_vec = query.embedding.numpy()[0]
        results, distances = self.index.get_nns_by_vector(
            query_vec, k,
            include_distances=True
        )

        return results, distances

    def save(self):

        self.index.save(self.file)


class FaissIndexMap:

    def __init__(self, dim):

        self.dim = dim
        self._index = IndexFlatL2(self.dim)
        self.index = IndexIDMap(self._index)
        self.table = pd.DataFrame(columns=['sentence'])
        self.counter = 0

    def add(self, sentence):

        nextId = self.counter
        df = self.table
        self.table = df.append(
          pd.Series({
              'text': sentence.to_plain_string(),
              'sentence': sentence
            },
            name=nextId
          ),
          ignore_index=True
        )
        vec = sentence.embedding.numpy()
        self.index.add_with_ids(vec, np.array([nextId]))
        self.counter += 1

    def search(self, query, k=5):

        query_vec = query.embedding.numpy()

        distances, ids = self.index.search(query_vec, k)
        results = self.table.loc[ids[0]]
        results['distance'] = distances[0]

        return results
