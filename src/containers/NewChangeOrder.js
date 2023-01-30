import { connect } from 'react-redux';

import NewChangeOrder from '../components/NewChangeOrder';
import {
  addChangeOrder,
  deleteProject,
  getCoordinates,
} from '../redux/actions';

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
    addChangeOrder: (changeOrder) => dispatch(addChangeOrder(changeOrder)),
    getCoordinates: (address) => dispatch(getCoordinates(address)),
    deleteProject: (token, id) => dispatch(deleteProject(token, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewChangeOrder);
