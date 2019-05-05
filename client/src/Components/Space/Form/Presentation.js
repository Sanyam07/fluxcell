import React, { Fragment } from 'react';
import Select from 'react-select';

import { Input, Button } from 'reactstrap';

const selectStyles = {
  container: (base, state) => ({
    ...base,
    zIndex: '999',
  }),
};

const Presentation = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, data, mutate, space } = props;

  // console.log('mutate', mutate);

  if (data.loading) return <div> Loading... </div>;

  return (
    <Fragment>
      <div> Spaces: </div>
      <Select
        styles={{
          menuPortal: (base) => {
            const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
            return { ...rest, zIndex: 9999 };
          },
        }}
        menuPortalTarget={document.body}
        options={data.spaces.map(s => ({ value: s.id, label: s.name }))}
      />

      <form onSubmit={handleSubmit}>
        <div> Create new </div>
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
