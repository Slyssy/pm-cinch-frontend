import { connect } from 'react-redux';

import NewExpense from '../components/NewExpense';
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
export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
