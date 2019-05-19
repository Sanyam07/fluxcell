from types import MethodType
import uuid

# EXPERIMENTAL - NOT IN USE
# mostly the skeleton of an idea at this point

class Cell:

    def __init__(
        self,
        key=uuid.uuid4(), name=None,                     # meta
        contents=None, heartbeat=None, metabolism=None,  # anatomical
        birth=None, lifecycle=None, death=None,          # developmental
        upstream=None, contexts=None, downstream=None,   # ecological
        parents=None, relatives=None, children=None):    # evolutionary

        # meta
        self.key = key
        self.name = name

        # anatomical
        self._contents = contents
        self._heartbeat = heartbeat
        self._metabolism = metabolism

        # developmental
        self._birth = birth
        self._lifecycle = lifecycle
        self._death = death

        # ecological
        self._contexts = contexts
        self._relatives = relatives
        self._streams = downstreams

        # evolutionary
        self._parents = parents
        self._mutation = mutation
        self._children = children

    def set_method(self, name, method):

        setattr(self, name, MethodType(method, self))
