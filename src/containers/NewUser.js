import { connect } from 'react-redux';

import NewUser from '../components/NewUser';
import { getOrgs } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    organizations: state.organizations,
    selection: state.selection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrgs: () => dispatch(getOrgs()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
