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


for line in test_lines:
    ai.parse(line)
