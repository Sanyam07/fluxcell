
import uuid


class Cell:

    def __init__(self, content, name=None, key=uuid.uuid4()):

        self.key = key
        self.name = name
        self.content = content
