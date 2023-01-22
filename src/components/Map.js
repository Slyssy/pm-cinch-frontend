import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '30vh',
};

function Map(props) {
  // console.log(props);
  // console.log('lat: ', props.lat, 'lng: ', props.lng);
  const center = {
    lat: props.lat,
    lng: props.lng,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = React.useState(null);
  const [zoom, setZoom] = React.useState();
  const onLoad = React.useCallback(function callback(map) {
    setZoom(18);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker position={center} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
