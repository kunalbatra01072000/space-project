import React, { Fragment, useEffect } from "react";
import Spinner from "../Spinner";

const Weatherui = ({ Weat, loadweather, getlocation, error }) => {
  useEffect(() => {
    getlocation();
    // eslint-disable-next-line
  }, []);

  if (loadweather) {
    return <Spinner />;
  } else if (error !== "") {
    return (
      <Fragment>
        <h4>{error}</h4>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="container">
          <img src={Weat.icon} alt={Weat.weather} style={weatherimgstyle}></img>
          <h3>{Weat.city}</h3>
          <h4>Temperature: {Weat.temp} &#8451; </h4>
          <h4>Min Temperature: {Weat.mintemp} &#8451;</h4>
          <h4>Max Temperature: {Weat.maxtemp} &#8451;</h4>
          <h4>Pressure: {Weat.pressure} hPa</h4>
          <h4>Humidity: {Weat.humidity}%</h4>
          <h4>
            Wind : {Weat.windspeed} m/s {Weat.winddir} &#176;
          </h4>
        </div>
      </Fragment>
    );
  }
};
const weatherimgstyle = {
  width: "80px",
  height: "80px",
};
export default Weatherui;
