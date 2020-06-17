import React from "react";

const Weathercard = ({ dayinfo }) => {
  return (
    <div className="card" style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
      <h4>Martian Day: {dayinfo.sol}</h4>
      <h4>Earth Day: {dayinfo.earthdate}</h4>
      <p>Max Temp: {dayinfo.maxtemp} &#8451;</p>
      <p>Min Temp: {dayinfo.mintemp} &#8451;</p>
      <p>Windspeed: {dayinfo.windspeed} m/s</p>
      <p>Pressure: {dayinfo.pressure} Pa</p>
    </div>
  );
};

export default Weathercard;
