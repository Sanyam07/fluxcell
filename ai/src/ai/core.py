from ai.nlp.models import Embedder, Codex


class AI:

    def __init__(self):

        self.embedder = Embedder()
        self.dim = self.embedder.dim
        self.codex = Codex(self.dim)

    def parse(self, text):

        sentence = self.embedder.embed(text)
        self.codex.add(sentence)

    def search(self, query, k=5):

        query_sentence = self.embedder.embed(query)
        self.codex.search(query_sentence, k)
