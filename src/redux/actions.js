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

// export const addProject = (project, esd, ecd) => {
//   return (dispatch) => {
//     axios
//       .post('https://pm-cinch-backend.vercel.app/projects', {
//         projectName: project.projectName,
//         street1: project.street1,
//         street2: project.street2,
//         city: project.city,
//         state: project.state,
//         zip: project.zip,
//         projectStatus: project.projectStatus,
//         projectMargin: project.projectMargin,
//         originalRevenue: project.originalRevenue,
//         adjustedRevenue: project.adjustedRevenue,
//         budgetedMaterialExpense: project.budgetedMaterialExpense,
//         budgetedLaborExpense: project.budgetedLaborExpense,
//         budgetedSubcontractorExpense: project.budgetedSubcontractorExpense,
//         budgetedMiscellaneousExpense: project.budgetedMiscellaneousExpense,
//         adjustedMaterialExpense: project.adjustedMaterialExpense,
//         adjustedLaborExpense: project.adjustedLaborExpense,
//         adjustedSubcontractorExpense: project.adjustedSubcontractorExpense,
//         adjustedMiscellaneousExpense: project.adjustedMiscellaneousExpense,
//         actualMaterialExpense: project.actualMaterialExpense,
//         actualLaborExpense: project.actualLaborExpense,
//         actualSubcontractorExpense: project.actualSubcontractorExpense,
//         actualMiscellaneousExpense: project.actualMiscellaneousExpense,
//         // ESD: formatDate(esd),
//         // ECD: formatDate(ecd),
//         ASD: project.ASD,
//         ACD: project.ACD,
//       })
//       .then((response) => {
//         const action = {
//           type: 'ADD_PROJECT',
//           value: project,
//         };
//         dispatch(action);
//       });
//   };
// };

// export const deleteProject = (index) => {
//   return {
//     type: 'DELETE_PROJECT',
//     value: index,
//   };
// };

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
