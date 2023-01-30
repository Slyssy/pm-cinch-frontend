import { connect } from 'react-redux';

import NewExpense from '../components/NewExpense';
import { addExpenses } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    user: state.user,
    token: state.token,
    selection: state.selection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addExpenses: (expense) => dispatch(addExpenses(expense)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
