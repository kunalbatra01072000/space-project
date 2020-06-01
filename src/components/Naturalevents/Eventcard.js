import React from "react";

const Eventcard = ({ event }) => {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>Category: {event.category}</p>
      <p>
        Date Started: {event.date} <br />
      </p>
      {event.magnunit && (
        <p>
          {" "}
          Magnitude :{event.magnval} {event.magnunit}
        </p>
      )}
      {event.closed && <p> Ended on : {event.closed}</p>}
      {!event.closed && <p className="danger">Active</p>}
    </div>
  );
};

export default Eventcard;
