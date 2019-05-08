import numpy as np
import pandas as pd

import faiss

from flair.data import Sentence
from flair.models import SequenceTagger
from flair.embeddings import (DocumentPoolEmbeddings,
                              FlairEmbeddings,
                              WordEmbeddings)

from pathlib import Path
import pickle


class Codex:

    def __init__(self, dim):

        self.dim = dim
        self._index = faiss.IndexFlatL2(self.dim)
        self.index = faiss.IndexIDMap(self._index)
        self.table = pd.DataFrame(columns=['sentence'])
        self.counter = 0

    def add(self, sentence):

        nextId = self.counter
        df = self.table
        self.table = df.append(
          pd.Series({'sentence': sentence}, name=nextId),
          ignore_index=True
        )
        vec = sentence.embedding.numpy()
        self.index.add_with_ids(vec, np.array([nextId]))
        self.counter += 1

    def search(self, query, k=5):

        query_vec = query.embedding.numpy()

        dists, ids = self.index.search(query_vec, k)
        for ident in ids[0]:
            print(self.table.loc[ident, 'sentence'])


class Embedder:

    def __init__(self, name='crawl'):

        # Text Embedding Model
        self.name = name
        if 'flair' in name:
            self.flair = True
            self.stripped_name = name.split("-")[1]
        else:
            self.flair = False
            self.stripped_name = name
        self.file = '/store/ai/model/embeddings-' + name

        if Path(self.file).is_file():
            print('loading embedder from file')
            filestream = open(self.file, 'rb')
            self.embeddings = pickle.load(filestream)
        else:
            print('downloading pretrained embedders')
            self.name = name
            if self.flair:
                self.embeddings = FlairEmbeddings(self.name)
            else:
                self.embeddings = WordEmbeddings(name)
            filestream = open(self.file, 'wb')
            pickle.dump(self.embeddings, filestream)

        self.doc = DocumentPoolEmbeddings(self.embeddings)
        self.dim = self.doc.embedding_length

    def embed(self, text):

        sentence = Sentence(text)
        self.doc.embed(sentence)

        return sentence


class Tagger:

    def __init__(self, name='ner-ontonotes'):

        # Sequence Tagging Model
        self.file = '/store/ai/model/tagger-' + name

        if Path(self.file).is_file():
            print('loading tagger from file')
            self.tagger = SequenceTagger.load_from_file(self.file)
        else:
            print('downloading pretrained tagger')
            self.tagger = SequenceTagger.load(name)
            self.save(self.file)
