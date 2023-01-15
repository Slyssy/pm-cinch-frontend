import { connect } from 'react-redux';

import NewOrganizations from '../components/NewOrganization';
import { getOrgs, selectDropdown } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    organizations: state.organizations,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectDropdown: (selection) => dispatch(selectDropdown(selection)),
//     getOrgs: () => dispatch(getOrgs()),
//   };
// };
export default connect(mapStateToProps)(NewOrganizations);
