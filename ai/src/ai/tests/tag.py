from ai.core import AI
from ai.data.doc.html import Page

ai = AI()


rorty = Page(
    url='https://plato.stanford.edu/entries/rorty/',
    root_divs=[
        'aueditable',
        'preamble',
        'main-text'
    ]
)

rorty.contents
