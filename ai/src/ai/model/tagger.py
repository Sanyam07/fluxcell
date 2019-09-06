from flair.models import SequenceTagger

from pathlib import Path

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
