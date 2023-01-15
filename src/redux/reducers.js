import { combineReducers } from 'redux';

const token = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return [action.value];
    default:
      return state;
  }
};

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

const projects = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROJECTS':
      return action.value;
    default:
      return state;
  }
};

export default combineReducers({ token, organizations, selection, projects });
