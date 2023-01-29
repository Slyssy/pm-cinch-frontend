import { connect } from 'react-redux';

import ProjectDetails from '../components/ProjectDetails';
import {
  deleteProject,
  getChangeOrders,
  getCoordinates,
  getCurrentProject,
  getExpenses,
  getProjects,
} from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    coordinates: state.coordinates,
    user: state.user,
    token: state.token,
    expenses: state.expenses,
    currentProject: state.currentProject,
    changeOrders: state.changeOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (token) => dispatch(getProjects(token)),
    getChangeOrders: (token, id) => dispatch(getChangeOrders(token, id)),
    getCoordinates: (address) => dispatch(getCoordinates(address)),
    deleteProject: (token, id) => dispatch(deleteProject(token, id)),
    getExpenses: (token, id) => dispatch(getExpenses(token, id)),
    getCurrentProject: (projects, paramId) =>
      dispatch(getCurrentProject(projects, paramId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
