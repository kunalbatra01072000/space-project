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
          <h4>Temperature: {Weat.temp} C</h4>
          <h4>Min Temperature: {Weat.mintemp} C</h4>
          <h4>Max Temperature: {Weat.maxtemp} C</h4>

          <h4>Humidity: {Weat.humidity}</h4>
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
