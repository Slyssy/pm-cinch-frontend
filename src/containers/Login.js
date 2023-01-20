import { connect } from 'react-redux';

import Login from '../components/Login';
import { addToken, addUser, getOrgs, selectDropdown } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: (token) => dispatch(addToken(token)),
    addUser: (user) => dispatch(addUser(user)),
    selectDropdown: (selection) => dispatch(selectDropdown(selection)),
    getOrgs: () => dispatch(getOrgs()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
