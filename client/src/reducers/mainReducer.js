export const SET_AUTH = 'SET_AUTH';
export const SET_SPACE = 'SET_SPACE';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, ...{ auth: action.data } };

    case SET_SPACE:
      return { ...state, ...{ space: action.data } };

    default:
      return state;
  }
}
