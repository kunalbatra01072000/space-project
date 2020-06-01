import React from "react";
import Search from "./Search/search";
import Alert from "./Search/Alert";
import Galleryitems from "./Search/Galleryitems";
const Galleryhome = ({
  Setalert,
  Searchnasaimg,
  alerttext,
  defaultimg,
  imggallery,
}) => {
  return (
    <div>
      <Search Setalert={Setalert} Searchnasaimg={Searchnasaimg} />
      <Alert alerttext={alerttext} />
      <Galleryitems
        imggallery={imggallery}
        defaultimg={defaultimg}
        Setalert={Setalert}
      />
    </div>
  );
};

export default Galleryhome;
