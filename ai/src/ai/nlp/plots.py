from ai.nlp.tensors import PCA, normalize_tensors

import matplotlib.pyplot as plt
import numpy as np

import re

head = {'head_width': 0.1, 'head_length': 0.2}
solid = {'linestyle': 'solid'}
dashed = {'linestyle': 'dashed'}
dotted = {'linestyle': 'dotted'}


arrow_styles = {
  '->': {**solid, **head},
  '-': {**solid},
  '-->': {**dashed, **head},
  '--': {**dashed},
  '..': {**dotted},
  '..>': {**dotted, **head}
}


arrow_symbols = list(arrow_styles.keys())
escaped_arrow_symbols = [re.escape(symbol) for symbol in arrow_symbols]


def lex_veclang(text):

    patterns = "|".join(["{.*?}"] + escaped_arrow_symbols)
    matches = re.findall(patterns, text)
    tokens = [re.sub('[{}]', '', match) for match in matches]

    return tokens


def parse_veclang(text):

    tokens = lex_veclang(text)

    text = [token for token in tokens if token not in arrow_symbols]
    arrows = []

    arrow_instances = [(index, token) for index, token in enumerate(tokens)
                       if token in arrow_symbols]
    for index, token in arrow_instances:
        first = text.index(tokens[index-1])
        second = text.index(tokens[index+1])
        arrows.append((first, second, token))

    return text, arrows


def plot_embeddings(lines, tensors, arrows):

    vectors = [tensor.data.numpy() for tensor in tensors]
    filename = '/data/fig.png'

    fig, ax = plt.subplots()
    factor = 2
    fig.figsize = (factor*6.4, factor*4.8)

    x = [vec[0] for vec in vectors]
    y = [vec[1] for vec in vectors]

    ax.scatter(x, y, color='white')

    gap = 0.5
    for arrow in arrows:
        i, j, style = arrow
        delta = vectors[j] - vectors[i]
        delta_unit = delta/np.linalg.norm(delta)
        base = vectors[i] + gap*delta_unit
        diff = delta - 2*gap*delta_unit
        plt.arrow(base[0], base[1], diff[0], diff[1],
                  color='#3a3a3a',
                  length_includes_head=True, antialiased=True,
                  **arrow_styles[style])

    printed = []
    for i, line in enumerate(lines):
        if line not in printed:
            ax.annotate(line, (x[i], y[i]), ha='center', va='center')
            printed.append(line)

    plt.axis('off')
    plt.savefig(filename)

    return filename


def mindplot(model, text):

    # parsing
    lines, arrows = parse_veclang(text)
    sentences = [model.parse(line) for line in lines]
    tensors = [s.get_embedding() for s in sentences]

    # tensor processing
    norm_tensors = normalize_tensors(tensors)
    flat_tensors = PCA(norm_tensors)

    # plot plot
    filename = plot_embeddings(lines, flat_tensors, arrows)

    return f'Plotted mindplot to {filename}'
