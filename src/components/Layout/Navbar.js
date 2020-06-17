import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import Menuicon from "./Menuicon.png";
const Navbar = () => {
  const [showdrop, setshowdrop] = useState(false);
  const onClick = (e) => {
    setshowdrop(!showdrop);
  };
  const dropdown = (
    <div className="text-center dropdown ">
      <ul>
        <li>
          <Link to="/space-project/">Home</Link>
        </li>
        <li>
          {" "}
          <Link to="/space-project/mars-weather">Mars weather</Link>
        </li>
        <li>
          {" "}
          <Link to="/space-project/natural-event">Recent Disasters</Link>
        </li>
        <li>
          <Link to="/space-project/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/space-project/about">About</Link>
        </li>
      </ul>
    </div>
  );

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
      <div className="menu-icon ">
        <img
          src={Menuicon}
          alt="Menu"
          className="menu-img-icon"
          onClick={onClick}
        />
        {showdrop && dropdown}
      </div>
    </Fragment>
  );
};

export default Navbar;
