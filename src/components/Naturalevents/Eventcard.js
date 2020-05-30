import React from "react";

const Eventcard = ({ event }) => {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>Category: {event.category}</p>
      <p>
        Date: {event.date} <br />
      </p>
      {event.magnunit && (
        <p>
          {" "}
          Magnitude :{event.magnval} {event.magnunit}
        </p>
      )}
    </div>
  );
};

export default Eventcard;
