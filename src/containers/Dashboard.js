import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import {
  getOrgs,
  selectDropdown,
  getProjects,
  getExpenses,
  addExpenses,
} from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    token: state.token,
    projects: state.projects,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectDropdown: (selection) => dispatch(selectDropdown(selection)),
    getOrgs: () => dispatch(getOrgs()),
    getProjects: (token) => dispatch(getProjects(token)),
    getExpenses: (token, id) => dispatch(getExpenses(token, id)),
    addExpenses: (expenses) => dispatch(addExpenses(expenses)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
