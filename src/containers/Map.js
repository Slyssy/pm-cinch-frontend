import { connect } from 'react-redux';
import Map from '../components/Map';
// import { getCoordinates } from '../redux/action';

const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getCoordinates: (address) => dispatch(getCoordinates(address)),
//   };
// };

export default connect(mapStateToProps, null)(Map);
