import { connect } from 'react-redux';

import Login from '../components/Login';
import { addToken, getOrgs, selectDropdown } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: (token) => dispatch(addToken(token)),
    selectDropdown: (selection) => dispatch(selectDropdown(selection)),
    getOrgs: () => dispatch(getOrgs()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
