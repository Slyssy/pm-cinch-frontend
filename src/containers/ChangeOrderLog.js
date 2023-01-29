import { connect } from 'react-redux';

import ChangeOrderLog from '../components/ChangeOrderLog';
import { deleteExpense } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    user: state.user,
    token: state.token,
    expenses: state.expenses,
    changeOrders: state.changeOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteChangeOrder: (token, id) => dispatch(deleteExpense(token, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeOrderLog);
