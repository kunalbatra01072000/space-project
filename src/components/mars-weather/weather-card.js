import React from 'react';

const Weathercard = ({ dayinfo }) => {
  return (
    <div className='card' style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
      <h4>Martian Day: {dayinfo.sol}</h4>
      <p>Max Pressure: {dayinfo.Pmax} Pa</p>
      <p>Min Pressure: {dayinfo.Pmin} Pa</p>
      <p>Avg Pressure: {dayinfo.Pavg} Pa</p>
      <p>Season : {dayinfo.season}</p>
    </div>
  );
};

export default Weathercard;
