import requests as req
import bs4


def fetchPage(url, sections):

    response = req.get(url)
    response.encoding = 'utf-8'

    html = bs4.BeautifulSoup(response.text, 'html.parser')

    contents = {}
    for section in sections:
        result = html.find('div', {'id': section})
        if result:
            contents[section] = result

    return contents


def parseSection(section):

    if isinstance(section, str):
        if section == '\n':
            return None
        else:
            return section.replace('\n', ' ')
    else:
        return {
            'type': section.name,
            'content': [parseSection(child)
                        for child in section.children
                        if parseSection(child)]
        }


def parse(page):

    result = {}
    for key, val in page.items():
        if val:
            result[key] = parseSection(val)

    return result


def parseSep(page):

    page = parse(page)


def fetchSepPage(url):

    sections = [
      'preamble',
      'main-text'
    ]

    rawPage = fetchPage(url, sections)
    page = parse(rawPage)

    return page


def printPage(page):

    print('printing page:')
    for name, section in page.items():
        kind = section['type']
        content = section['content']
        if isinstance(content, list):
            length = len(content)
        print('name: ', name)
        print('kind: ', kind)
        print('type: ', type(content))
        if length:
            print('length: ', length)
        if isinstance(content, list):
            for num, line in enumerate(content):
                print('line ', num)
                print('type ', type(line))
                print(line)
        else:
            print(content)
