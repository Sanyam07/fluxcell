import { toast } from "react-toastify";

export default {
  mapPropsToValues: () => ({ name: "" }),

  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },

  handleSubmit: async (values, { props }) => {
    const { name } = values;
    const { mutate, setSpace, data } = props;

    const res = await mutate({
      variables: { name },
    });

    console.log("createSpace res", res);
    setSpace(res.data.createSpace);
    data.refetch();
    toast("New space added.");
  },

  displayName: "Space",
};
