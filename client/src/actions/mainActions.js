import { SET_AUTH, SET_SPACE } from '../reducers/mainReducer';

export function setAuth(data) {
  return {
    type: SET_AUTH,
    data,
  };
}

export function setSpace(data) {
  return {
    type: SET_SPACE,
    data,
  };
}
