import { withFormik } from 'formik';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import handlers from './handlers';
import Presentation from './Presentation';

export default compose(
  graphql(
    gql`
      query {
        spaces {
          id
          name
        }
      }
    `,
    {
      pollInterval: 1000,
    }
  ),
  graphql(gql`
    mutation createSpace($name: String!) {
      createSpace(name: $name)
    }
  `),
  withFormik(handlers)
)(Presentation);
