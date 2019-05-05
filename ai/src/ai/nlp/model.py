from flair.data import Sentence
from flair.models import SequenceTagger
from flair.embeddings import (DocumentPoolEmbeddings,
                              FlairEmbeddings, StackedEmbeddings)


from pathlib import Path
import pickle


class Model:

    modelpath = '/store/ai/model/'

    def __init__(self):

        # Sequence Tagging Model
        tagger_file = self.modelpath + 'tagger.pt'
        if Path(tagger_file).is_file():
            print('loading tagger from file')
            self.tagger = SequenceTagger.load_from_file(tagger_file)
        else:
            print('downloading pretrained tagger')
            self.tagger = SequenceTagger.load('ner-ontonotes')
            self.tagger.save(tagger_file)

        # Text Embedding Model
        embeddings_file = self.modelpath + 'embeddings.pickle'
        if Path(embeddings_file).is_file():
            print('loading embedder from file')
            filestream = open(embeddings_file, 'rb')
            self.embeddings = pickle.load(filestream)
        else:
            print('downloading pretrained embedders')
            self.embeddings = [
                # WordEmbeddings('glove'),
                FlairEmbeddings('multi-forward')
                # FlairEmbeddings('multi-backward')
            ]
            filestream = open(embeddings_file, 'wb')
            pickle.dump(self.embeddings, filestream)

        self.token_embedder = StackedEmbeddings(self.embeddings)
        self.doc_embedder = DocumentPoolEmbeddings(self.embeddings)

    def parse(self, text):

        sentence = Sentence(text)
        self.tagger.predict(sentence)
        self.token_embedder.embed(sentence)
        self.doc_embedder.embed(sentence)

        return sentence
