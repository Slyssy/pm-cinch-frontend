import React, { useEffect } from 'react';
import BarChart from './BarChart';

const Barchart = () => {
  useEffect(
    () => {
      drawChart();
    },
    // eslint-disable-next-line
    []
  );

  return <div>Barchart</div>;
};

export default Barchart;
