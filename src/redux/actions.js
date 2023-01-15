import axios from 'axios';
import Geocode from 'react-geocode';
const apiKey = process.env.REACT_APP_API_KEY;

export const addToken = (token) => {
  return {
    type: 'ADD_TOKEN',
    value: token,
  };
};

export const addOrgs = (org) => {
  return {
    type: 'ADD_ORG',
    value: org,
  };
};

export const selectDropdown = (selection) => {
  return {
    type: 'ADD_SELECTION',
    value: selection,
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
