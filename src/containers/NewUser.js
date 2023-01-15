import { connect } from 'react-redux';

import NewUser from '../components/NewUser';

const mapStateToProps = (state) => {
  return {
    organizations: state.organizations,
    selection: state.selection,
  };
};

export default connect(mapStateToProps)(NewUser);
