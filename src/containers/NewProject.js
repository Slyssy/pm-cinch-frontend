import { connect } from 'react-redux';
import NewProject from '../components/NewProject';
import { addESD, addECD, getCoordinates } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    token: state.token,
    projects: state.projects,
    coordinates: state.coordinates,
    esd: state.esd,
    ecd: state.ecd,
    // dialogOpen: state.dialogOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addProject: (project) => dispatch(addProject(project)),
    getCoordinates: (address) => dispatch(getCoordinates(address)),
    addESD: (esd) => dispatch(addESD(esd)),
    addECD: (esd) => dispatch(addECD(esd)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
