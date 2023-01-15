import { connect } from 'react-redux';

import Dropdown from '../components/Dropdown';
import { getOrgs, selectDropdown } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    organizations: state.organizations,
    selection: state.selection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectDropdown: (selection) => dispatch(selectDropdown(selection)),
    getOrgs: () => dispatch(getOrgs()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
