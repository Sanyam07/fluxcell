import React, { Fragment } from 'react';

import { Input, Button } from 'reactstrap';

const Presentation = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, data, mutate } = props;

  // console.log('mutate', mutate);

  if (data.loading) return <div> Loading... </div>;

  return (
    <Fragment>
      <div> Spaces: </div>
      <ul>
        {data.spaces.map(s => (
          <li key={`space.${s.name}`}> {s.name} </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <Input type="text" onChange={handleChange} onBlur={handleBlur} value={values.name} name="name" />
        {errors.name && touched.name && <div id="feedback">{errors.name}</div>}

        <Button className="mt-2" type="submit">
          Create new
        </Button>
      </form>
    </Fragment>
  );
};

export default Presentation;
