import { combineReducers } from 'redux';

const organizations = (state = [], action) => {
  switch (action.type) {
    case 'GET_ORGS':
      return [action.value];
    default:
      return state;
  }
};

const selection = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SELECTION':
      return [...state, action.value];
    default:
      return state;
  }
};

export default combineReducers({ organizations, selection });
