import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import {
  getProjects,
  getExpenses,
  addExpenses,
  getChangeOrders,
  addChangeOrder,
} from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    token: state.token,
    projects: state.projects,
    user: state.user,
    expenses: state.expenses,
    changeOrders: state.changeOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (token) => dispatch(getProjects(token)),
    getExpenses: (token, id) => dispatch(getExpenses(token, id)),
    addExpenses: (expenses) => dispatch(addExpenses(expenses)),
    addChangeOrder: (changeOrders) => dispatch(addChangeOrder(changeOrders)),
    getChangeOrders: (token, id) => dispatch(getChangeOrders(token, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
