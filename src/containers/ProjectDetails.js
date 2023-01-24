import { connect } from 'react-redux';

import ProjectDetails from '../components/ProjectDetails';
import { deleteProject, getCoordinates } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    coordinates: state.coordinates,
    user: state.user,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCoordinates: (address) => dispatch(getCoordinates(address)),
    deleteProject: (token, id) => dispatch(deleteProject(token, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
