import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import {
  getOrgs,
  selectDropdown,
  getProjects,
  getExpenses,
  addExpenses,
  getChangeOrders,
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
    getChangeOrders: (token, id) => dispatch(getChangeOrders(token, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
