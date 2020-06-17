import React, { Fragment, useState, useEffect, useRef } from "react";
import Eventcard from "./Eventcard";
import Spinner from "../Layout/Spinner";
import axios from "axios";
import earthquakeImg from "./img/earthquake.png";
import volcano from "./img/volcano.png";
import fire from "./img/fire.png";
import flood from "./img/flood.png";
import storm from "./img/lightning-bolt.png";
const Naturaleventfinder = () => {
  const [events, setevents] = useState([]);
  const [eventload, seteventload] = useState(false);
  const [nodatfetch, setnodatfetch] = useState(false);
  const [logo, setlogo] = useState("");
  const mounted = useRef();

  const logodecider = (eventName) => {
    switch (eventName) {
      case "volcanoes":
        return volcano;
      case "wildfires":
        return fire;
      case "earthquakes":
        return earthquakeImg;
      case "severeStorms":
        return storm;
      case "floods":
        return flood;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (events.length === 0) {
        setnodatfetch(true);
      } else {
        setnodatfetch(false);
      }
    }
  }, [events]);

  const eventfinder = async (e) => {
    seteventload(true);
    let Eventname = e.target.name;
    const res = await axios.get(
      `https://eonet.sci.gsfc.nasa.gov/api/v3/categories/${Eventname}`
    );

    setevents(
      res.data.events.map((info) => {
        return {
          title: info.title,
          category: info.categories[0].title,
          id: info.id,
          date: new Date(info.geometry[0].date).toDateString(),
          magnunit: info.geometry[0].magnitudeUnit,
          magnval: info.geometry[0].magnitudeValue,
          closed: info.closed,
        };
      })
    );

    setlogo(logodecider(Eventname));
    seteventload(false);
  };

  const eventBtns = (
    <Fragment>
      <div className="event-selector">
        <button
          className="event-btn btn btn-dark"
          onClick={eventfinder}
          name="wildfires"
        >
          Wildfires
        </button>
        <button
          className="event-btn btn btn-dark"
          name="volcanoes"
          onClick={eventfinder}
        >
          Volcanoes
        </button>
        <button
          className="event-btn btn btn-dark"
          name="severeStorms"
          onClick={eventfinder}
        >
          Storms
        </button>
        <button
          className="event-btn  btn btn-dark"
          name="earthquakes"
          onClick={eventfinder}
        >
          Earthquakes
        </button>

        <button
          className="event-btn btn btn-dark"
          name="floods"
          onClick={eventfinder}
        >
          Floods
        </button>
        <button
          className="event-btn btn btn-dark"
          name="dustHaze"
          onClick={eventfinder}
        >
          Dust Haze
        </button>
      </div>
    </Fragment>
  );

  if (eventload) {
    return (
      <Fragment>
        {eventBtns}

        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {eventBtns}
        {nodatfetch && <div>No natural events found</div>}
        {events && (
          <div className="Events-block">
            {events.map((event) => (
              <Eventcard key={event.id} event={event} logo={logo} />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
};

export default Naturaleventfinder;
