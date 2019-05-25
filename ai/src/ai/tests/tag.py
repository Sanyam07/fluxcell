from ai.data.space import Space
from ai.data.doc.html import Page

space = Space()

rorty = Page(
    url='https://plato.stanford.edu/entries/rorty/',
    root_divs=[
        'preamble',
        'main-text'
    ]
)

rorty.contents
