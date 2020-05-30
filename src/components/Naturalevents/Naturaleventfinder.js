import React from "react";
import Eventcard from "./Eventcard";
import Spinner from "../Layout/Spinner";

const Naturaleventfinder = ({ eventload, eventfinder, events }) => {
  if (eventload) {
    return <Spinner />;
  } else {
    return (
      <div className="Events-block">
        {events.map((event) => (
          <Eventcard key={event.id} event={event} />
        ))}
      </div>
    );
  }
};

export default Naturaleventfinder;
