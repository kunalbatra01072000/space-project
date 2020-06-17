import React, { Fragment } from "react";
import Spinner from "./Spinner";
const Imageofday = ({ getimageofday, loading, imgobj }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <img src={imgobj.imgurl} alt="img-of-day" className="img-of-day"></img>
        <h1>{imgobj.imgtitle}</h1>
        <p style={{ marginBottom: "2rem" }}>{imgobj.imgexp}</p>
      </Fragment>
    );
  }
};

export default Imageofday;
