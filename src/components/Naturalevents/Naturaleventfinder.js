import React, { Fragment, useState, useEffect, useRef } from "react";
import Eventcard from "./Eventcard";
import Spinner from "../Layout/Spinner";
import axios from "axios";

const Naturaleventfinder = () => {
  const [events, setevents] = useState([]);
  const [eventload, seteventload] = useState(false);
  const [nodatfetch, setnodatfetch] = useState(false);
  const mounted = useRef();
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
    const res = await axios.get(
      `https://eonet.sci.gsfc.nasa.gov/api/v3/categories/${e.target.name}`
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
    seteventload(false);
  };

  if (eventload) {
    return (
      <Fragment>
        <div className="event-selector">
          <button
            className="event-btn btn"
            onClick={eventfinder}
            name="wildfires"
          >
            Wildfires
          </button>
          <button
            className="event-btn btn"
            name="volcanoes"
            onClick={eventfinder}
          >
            Volcanoes
          </button>
          <button
            className="event-btn btn"
            name="severeStorms"
            onClick={eventfinder}
          >
            Storms
          </button>
          <button
            className="event-btn  btn"
            name="earthquakes"
            onClick={eventfinder}
          >
            Earthquakes
          </button>
          <button className="event-btn btn" name="floods" onClick={eventfinder}>
            Floods
          </button>
          <button
            className="event-btn btn"
            name="dustHaze"
            onClick={eventfinder}
          >
            Dust Haze
          </button>
        </div>

        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="event-selector">
          <button
            className="event-btn btn"
            onClick={eventfinder}
            name="wildfires"
          >
            Wildfires
          </button>
          <button
            className="event-btn btn"
            name="volcanoes"
            onClick={eventfinder}
          >
            Volcanoes
          </button>
          <button
            className="event-btn btn"
            name="severeStorms"
            onClick={eventfinder}
          >
            Storms
          </button>
          <button
            className="event-btn  btn"
            name="earthquakes"
            onClick={eventfinder}
          >
            Earthquakes
          </button>

          <button className="event-btn btn" name="floods" onClick={eventfinder}>
            Floods
          </button>
          <button
            className="event-btn btn"
            name="dustHaze"
            onClick={eventfinder}
          >
            Dust Haze
          </button>
        </div>
        {nodatfetch && <div>No natural events found</div>}
        {events && (
          <div className="Events-block">
            {events.map((event) => (
              <Eventcard key={event.id} event={event} />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
};

export default Naturaleventfinder;
