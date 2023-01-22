import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyMap from '../containers/Map';

const ProjectDetails = (props) => {
  console.log(props);

  const { id } = useParams();
  // console.log(id);
  const project = props.projects.rows.find((project) => project.id === +id);
  console.log(project);

  const address = `${project.street_1}, ${project.city}, ${project.state} ${project.zip}`;

  useEffect(() => {
    props.getCoordinates(address);
    // console.log(props.getCoordinates(listing.address));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MyMap lat={props.coordinates.lat} lng={props.coordinates.lng}></MyMap>
    </>
  );
};

export default ProjectDetails;
