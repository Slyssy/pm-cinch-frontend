import { connect } from 'react-redux';

import ProjectDetails from '../components/ProjectDetails';
import { getCoordinates } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    coordinates: state.coordinates,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCoordinates: (address) => dispatch(getCoordinates(address)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
