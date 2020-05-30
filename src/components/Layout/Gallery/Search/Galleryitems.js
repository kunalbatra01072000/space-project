import React from "react";
import Galleryitem from "./galleryitem";

const Galleryitems = ({ imggallery, defaultimg }) => {
  if (imggallery.length === 0 && defaultimg === false) {
    return <div>Enter a valid search item.</div>;
  } else if (defaultimg === true) {
    return null;
  } else {
    return (
      <div style={Gallerystyle}>
        {imggallery.map((imginfo) => (
          <Galleryitem key={imginfo.imgid} imginfo={imginfo} />
        ))}
      </div>
    );
  }
};

const Gallerystyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};
export default Galleryitems;
