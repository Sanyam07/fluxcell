from ai.core import AI

ai = AI()

test_lines = [
    'this is a monkey',
    'that is an elephant',
    'there is a gorilla',
    'I like pear',
    'I love banana',
    'I like pancakes',
    'I want orange'
]

ai.parse(test_lines)

results = ai.search('ape', 5)
print(results)
