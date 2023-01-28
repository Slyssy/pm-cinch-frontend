import { connect } from 'react-redux';

import ProjectDetails from '../components/ProjectDetails';
import { addExpenses, deleteProject, getCoordinates, getExpenses } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    coordinates: state.coordinates,
    user: state.user,
    token: state.token,
    expenses: state.expenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    getCoordinates: (address) => dispatch(getCoordinates(address)),
    deleteProject: (token, id) => dispatch(deleteProject(token, id)),
    getExpenses: (token, id) => dispatch(getExpenses(token, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
