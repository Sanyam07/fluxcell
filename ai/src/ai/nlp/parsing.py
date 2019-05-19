def tokens_to_string(tokens):
    plain = ""
    for token in tokens:
        plain += token.text
        if token.whitespace_after:
            plain += " "

    return plain.rstrip()


def squash(stuff):

    root_kind = stuff['kind']
    if root_kind is 'contents':
        pass

    pass
