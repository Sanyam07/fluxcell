import React from "react";
import styled from "styled-components";
import { Card, CardBody } from "reactstrap";
import { lifecycle } from "recompose";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { renderTextInput } from "../../CommonComponents/formRenderers";
import { emit } from "../../utils/socketClient";
import authClient from "../../CommonComponents/Auth0/authClient";

const StyledTextArea = styled.textarea`
  width: 100%;
`;

const required = value => (value ? undefined : "Required");
const channelId = 1; // TODO create channels
const TextInput = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const submitForm = values => {
    sendMessage(values.chatMessage);
    reset();
  };

  const sendMessage = body => {
    console.log("emit", body);
    const profile = authClient.getProfile();
    emit({ name: "chatListener", msg: { username: authClient.getProfileForeName(), body, channelId } });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Card>
        <CardBody>
          <Field
            component={renderTextInput}
            id={"chatMessage"}
            name="chatMessage"
            data-lpignore="true"
            validate={required}
            ref={input => {
              // this.chatMessageInput = input;
            }}
          />
        </CardBody>
      </Card>
    </form>
  );
};

const enhance = lifecycle({
  componentDidMount() {
    // this.chatMessageInput.focus();
    console.log("props", this.props);
  },
});

const Enhanced = enhance(TextInput);

export default reduxForm({
  form: "textinput",
  initialValues: {
    chatMessage: null,
  },
})(Enhanced);
