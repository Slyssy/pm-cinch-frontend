import axios from 'axios';
import Geocode from 'react-geocode';
const apiKey = process.env.REACT_APP_API_KEY;

export const addToken = (token) => {
  return {
    type: 'ADD_TOKEN',
    value: token,
  };
};

export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    value: user,
  };
};

export const addOrgs = (org) => {
  return {
    type: 'ADD_ORG',
    value: org,
  };
};

export const addExpenses = (expenses) => {
  return {
    type: 'ADD_EXPENSES',
    value: expenses,
  };
};

export const addChangeOrder = (changeOrder) => {
  return {
    type: 'ADD_CHANGE_ORDER',
    value: changeOrder,
  };
};

export const selectDropdown = (selection) => {
  return {
    type: 'ADD_SELECTION',
    value: selection,
  };
};

export const getCurrentProject = (project) => {
  return {
    type: 'GET_CURRENT_PROJECT',
    value: project,
  };
};

// * Create an action to get latitude and longitude.
export const getCoordinates = (address) => {
  return (dispatch) => {
    Geocode.setApiKey(apiKey);
    Geocode.setLanguage('en');
    Geocode.setLocationType('ROOFTOP');
    Geocode.fromAddress(address).then((res) => {
      const action = {
        type: 'GET_COORDINATES',
        value: res.results[0].geometry.location,
      };
      // console.log(action);
      dispatch(action);
    });
  };
};

export const getOrgs = () => {
  return (dispatch) => {
    axios
      .get('https://pm-cinch-backend.vercel.app/organizations')
      .then((response) => {
        const action = {
          type: 'GET_ORGS',
          value: response.data,
        };
        dispatch(action);
      });
  };
};

export const getProjects = (token) => {
  return (dispatch) => {
    axios
      .get('https://pm-cinch-backend.vercel.app/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const action = {
          type: 'GET_PROJECTS',
          value: response.data,
        };
        dispatch(action);
      });
  };
};

export const deleteProject = (token, id) => {
  return (dispatch) => {
    console.log('deleteProject() called', id);
    axios
      .delete(`https://pm-cinch-backend.vercel.app/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const action = {
          type: 'DELETE_PROJECT',
          value: response.data,
        };
        dispatch(action);
      });
  };
};

export const addESD = (esd) => {
  return {
    type: 'ADD_ESD',
    value: esd,
  };
};

export const addECD = (ecd) => {
  return {
    type: 'ADD_ECD',
    value: ecd,
  };
};

export const getExpenses = (token, id) => {
  return (dispatch) => {
    axios
      .get(`https://pm-cinch-backend.vercel.app/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const action = {
          type: 'GET_EXPENSES',
          value: response.data,
        };
        dispatch(action);
      });
  };
};

export const getChangeOrders = (token, id) => {
  return (dispatch) => {
    axios
      .get(`https://pm-cinch-backend.vercel.app/changeOrder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const action = {
          type: 'GET_CHANGE_ORDER',
          value: response.data,
        };
        dispatch(action);
      });
  };
};

export const deleteExpense = (token, id) => {
  return (dispatch) => {
    axios
      .delete(`https://pm-cinch-backend.vercel.app/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const action = {
          type: 'DELETE_EXPENSE',
          value: response.data,
        };
        dispatch(action);
      });
  };
};

export const deleteChangeOrder = (token, id) => {
  return (dispatch) => {
    axios
      .delete(`https://pm-cinch-backend.vercel.app/changeOrder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const action = {
          type: 'DELETE_CHANGE_ORDER',
          value: response.data,
        };
        dispatch(action);
      });
  };
};
