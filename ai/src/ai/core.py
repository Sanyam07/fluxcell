from ai.nlp.models import Embedder
from ai.nlp.indeces import FaissIndexMap


class AI:

    def __init__(self):

        self.embedder = Embedder()
        self.dim = self.embedder.dim
        self.index = FaissIndexMap(self.dim)

    def parse(self, documents):

        for document in documents:
            sentence = self.embedder.embed(document)
            self.index.add(sentence)

        return sentence

    def search(self, query, k=5):

        query_sentence = self.embedder.embed(query)
        results = self.index.search(query_sentence, k)

        return results
