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
      return [action.value];
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
    case 'DELETE_PROJECT':
      return { ...state };
    default:
      return state;
  }
};

const currentProject = (state = null, action) => {
  switch (action.type) {
    case 'GET_CURRENT_PROJECT':
      return action.value;
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

const expenses = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSES':
      return [...state, action.value];
    case 'GET_EXPENSES':
      return [action.value];
    case 'DELETE_EXPENSE':
      return [...state];
    default:
      return state;
  }
};

const changeOrders = (state = null, action) => {
  switch (action.type) {
    case 'ADD_CHANGE_ORDERS':
      return [...state, action.value];
    case 'GET_CHANGE_ORDER':
      return action.value;
    case 'DELETE_EXPENSE':
      return [...state];
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
  expenses,
  coordinates,
  currentProject,
  changeOrders,
});
