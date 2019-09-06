from flair.data import Sentence
from flair.embeddings import (DocumentPoolEmbeddings,
                              FlairEmbeddings,
                              WordEmbeddings)

from pathlib import Path
import pickle


class Embedder:

    def __init__(self, name='en-crawl'):

        # check if a flair embedding is requested
        self.name = name
        if 'flair' in name:
            self.flair = True
            self.stripped_name = name.split("-")[1]
        else:
            self.flair = False
            self.stripped_name = name

        # construct embedding file path
        self.file = '/store/ai/model/embeddings-' + name

        # check if filepath exists
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

        # construct document embeddings
        self.doc = DocumentPoolEmbeddings([self.embeddings])
        self.dim = self.doc.embedding_length

    def embed(self, text):

        sentence = Sentence(text)
        self.doc.embed(sentence)

        return sentence


