import React, { useState } from "react";
import axios from "axios";
import Weatherui from "./weatherui";

const Weatherfinder = () => {
  const [Weat, setWeat] = useState({});
  const [loadweather, setloadweather] = useState(false);
  const [error, seterror] = useState("");
  const getlocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getweather, showerror);
    } else {
      seterror("Problem encountered");
    }
  };

  const getweather = async (pos) => {
    setloadweather(true);
    const lon = pos.coords.longitude;
    const lat = pos.coords.latitude;
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=66aec471ccd8d0cd8b17afc9e9c01be2`
    );

    setWeat({
      mintemp: res.data.main.temp_min,
      maxtemp: res.data.main.temp_max,
      humidity: res.data.main.humidity,
      pressure: res.data.main.pressure,
      icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
      weather: res.data.weather[0].main,
      temp: res.data.main.temp,
    });

    setloadweather(false);
  };

  const showerror = (error) => {
    seterror(error.code);
  };

  return (
    <Weatherui
      Weat={Weat}
      loadweather={loadweather}
      getlocation={getlocation}
      error={error}
    />
  );
};

export default Weatherfinder;
