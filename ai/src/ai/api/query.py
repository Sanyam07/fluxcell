import graphene
from flask import Flask
from flask_graphql import GraphQLView
import os


class Query(graphene.ObjectType):

    hello = graphene.String()

    def resolve_hello(self, info):
        return 'world'


view_func = GraphQLView.as_view(
    'graphql', schema=graphene.Schema(query=Query), graphiql=True)

app = Flask(__name__)
app.add_url_rule('/graphql', view_func=view_func)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 5555))


schema = graphene.Schema(query=Query)

schema.execute('''
  query {
    hello
  }
''')
