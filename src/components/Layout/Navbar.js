import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <ul>
          <li>
            <Link to="/space-project/">Home</Link>
          </li>
          <li>
            <Link to="/space-project/mars-weather">Mars weather</Link>
          </li>
          <li>
            <Link to="/space-project">About</Link>
          </li>
          <li>
            <Link to="/space-project/natural-event">Recent Disasters</Link>
          </li>
          <li>
            <Link to="/space-project/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
