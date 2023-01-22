import { combineReducers } from 'redux';

const token = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return [action.value];
    default:
      return state;
  }
};
const user = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
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
    //     case 'ADD_PROJECT':
    //       return [...state, action.value];
    //     case 'DELETE_PROJECT':
    //       const projects = [...state];
    //       projects.splice(action.value, 1);
    //       return projects;
    default:
      return state;
  }
};

const esd = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ESD':
      return [action.value];
    default:
      return state;
  }
};

const ecd = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ECD':
      return [action.value];
    default:
      return state;
  }
};

const coordinates = (state = [], action) => {
  switch (action.type) {
    case 'GET_COORDINATES':
      return action.value;
    default:
      return state;
  }
};

export default combineReducers({
  token,
  user,
  organizations,
  projects,
  selection,
  esd,
  ecd,
  coordinates,
});
