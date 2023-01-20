import { connect } from 'react-redux';

import DatePicker from '../components/DatePicker';
import { addECD, addESD } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    esd: state.esd,
    ecd: state.ecd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addESD: (esd) => dispatch(addESD(esd)),
    addECD: (esd) => dispatch(addECD(esd)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
