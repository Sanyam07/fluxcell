from ai.data.doc import Doc

import requests as req
import bs4


class Page(Doc):

    skip_kinds = ['ul', 'li']
    branch_kinds = ['div', 'p']
    leaf_kinds = ['blockquote', 'sup', 'a', 'em']

    def __init__(self, url, root_divs):

        self.url = url
        self.root_divs = root_divs

        response = req.get(url)
        response.encoding = 'utf-8'

        self.html = bs4.BeautifulSoup(response.text, 'html.parser')

        divs = {}

        for root_div in root_divs:
            result = self.html.find('div', {'id': root_div})
            if result:
                divs[root_div] = result

        self.contents = self.prep_divs(divs)

    def prep_divs(self, divs):

        result = {
            'kind': 'contents',
            'children': []
        }
        for div_name, div_contents in divs.items():
            result['children'] += self.prep_child(div_contents)['children']

        return result

    def prep_child(self, child):

        if child.name:
            is_header = child.name[0] == 'h'
        else:
            is_header = False

        if isinstance(child, str):
            result = str(child)
        elif child.name in self.leaf_kinds:
            result = "".join(child.children)
        elif child.name in self.skip_kinds:
            result = ""
        elif child.name in self.branch_kinds or is_header:
            children = [
                self.prep_child(child)
                for child in child.children
                if self.prep_child(child)
            ]
            if all([isinstance(child, str) for child in children]):
                children = "".join(children)
            result = {
                'kind': child.name,
                'children': children
            }
        else:
            result = ""

        if type(result) is str:
            if child == '\n':
                return None
            else:
                return result.replace('\n', ' ')
        else:
            return result

    def print_stuff(self, stuff, indent=''):

        if isinstance(stuff, dict):
            kind = stuff['kind']
            children = stuff['children']

            print(indent, 'kind: ', kind)
            if isinstance(children, list):
                print('length: ', len(children))
                for child in children:
                    self.print_stuff(child, indent+'*')
            else:
                self.print_stuff(children, indent+'*')
        else:
            print(indent, stuff)

    def print_thingy(self):

        print(repr(self.codex))
