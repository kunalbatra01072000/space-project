import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar bg-dark ">
        <img
          src={logo}
          alt=""
          style={{ width: "100px", marginRight: "1rem" }}
        />
        <ul>
          <li>
            <Link to="/space-project/">Home</Link>
          </li>
          <li>
            <Link to="/space-project/mars-weather">Mars weather</Link>
          </li>

          <li>
            <Link to="/space-project/natural-event">Recent Disasters</Link>
          </li>
          <li>
            <Link to="/space-project/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/space-project/about">About</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
