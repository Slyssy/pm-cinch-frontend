import { connect } from 'react-redux';

import ExpenseLog from '../components/ExpenseLog';
// import { deleteProject, getCoordinates } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    user: state.user,
    token: state.token,
    selection: state.selection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseLog);
