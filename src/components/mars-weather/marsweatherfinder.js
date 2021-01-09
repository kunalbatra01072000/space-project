import React from 'react';
import Spinner from '../Layout/Spinner';
import Weathercard from './weather-card';

const Marsweatherfinder = ({ marsload, weekinfo }) => {
  if (marsload === true) {
    return <Spinner />;
  } else {
    return (
      <div className='mars-weather-cards'>
        {weekinfo.map((dayinfo, idx) => (
          <Weathercard key={dayinfo.sol} dayinfo={dayinfo} />
        ))}
      </div>
    );
  }
};

export default Marsweatherfinder;
