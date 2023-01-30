import { connect } from 'react-redux';

import NewOrganization from '../components/NewOrganization';
import { addOrgs } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    organizations: state.organizations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOrgs: (org) => dispatch(addOrgs(org)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewOrganization);
