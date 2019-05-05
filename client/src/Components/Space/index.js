import React from 'react';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import Modal from './Modal';

const Space = props => <Modal {...props} />;

export default connect(
  state => ({
    space: state.app.main.space,
  }),
  dispatch => ({
    setSpace: data => dispatch(mainActions.setSpace(data)),
  })
)(Space);
