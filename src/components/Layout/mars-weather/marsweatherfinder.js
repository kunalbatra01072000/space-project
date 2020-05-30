import React from "react";
import Spinner from "../Spinner";
import Weathercard from "./weather-card";

const Marsweatherfinder = ({ marsload, getmarsweather, weekinfo }) => {
  if (marsload === true) {
    return <Spinner />;
  } else {
    return (
      <div className="mars-weather-cards">
        {weekinfo.map((dayinfo) => (
          <Weathercard key={dayinfo.sol} dayinfo={dayinfo} />
        ))}
      </div>
    );
  }
};

export default Marsweatherfinder;
