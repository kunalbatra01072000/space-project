import React from "react";

const Weathercard = ({ dayinfo }) => {
  return (
    <div className="card">
      <h4>Martian Day: {dayinfo.sol}</h4>
      <p>Max Temp: {dayinfo.maxtemp}</p>
      <p>Min Temp: {dayinfo.mintemp}</p>
      <p>Windspeed: {dayinfo.windspeed}</p>
    </div>
  );
};

export default Weathercard;
