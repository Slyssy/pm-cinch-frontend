import { connect } from 'react-redux';

import ExpenseLog from '../components/ExpenseLog';
import { deleteExpense } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    user: state.user,
    token: state.token,
    expenses: state.expenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExpense: (token, id) => dispatch(deleteExpense(token, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseLog);
