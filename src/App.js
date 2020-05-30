import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Imageofday from "./components/Layout/Imageofday";
import Weatherfinder from "./components/Layout/Weather/weatherfinder";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Marsweatherfinder from "./components/Layout/mars-weather/marsweatherfinder";
import Naturaleventfinder from "./components/Naturalevents/Naturaleventfinder";

import Nasaimg from "./components/Layout/Gallery/Nasaimg";
import Galleryhome from "./components/Layout/Gallery/Galleryhome";

function App() {
  const [loading, setloading] = useState(false);
  const [imgobj, setimgobj] = useState({});
  const [alerttext, setalerttext] = useState("");
  const [imggallery, setimggallery] = useState([]);
  const [defaultimg, setdefaultimg] = useState(true);

  const [events, setevents] = useState([]);
  const [eventload, seteventload] = useState(false);
  const [nasaimginfo, setnasaimginfo] = useState({});
  const [nasaimginfoload, setnasaimginfoload] = useState(false);
  const eventfinder = async () => {
    seteventload(true);
    const res = await axios.get(
      `https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=10&status=open`
    );

    setevents(
      res.data.events.map((info) => {
        return {
          title: info.title,
          category: info.categories[0].title,
          id: info.id,
          date: info.geometry[0].date,
          magnunit: info.geometry[0].magnitudeUnit,
          magnval: info.geometry[0].magnitudeValue,
        };
      })
    );
    seteventload(false);
  };
  useEffect(() => {
    getimageofday();
    eventfinder();
    getmarsweather();
    // eslint-disable-next-line
  }, []);
  const [marsload, setmarsload] = useState(false);

  const [weekinfo, setweekinfo] = useState([]);

  const getmarsweather = async () => {
    setmarsload(true);
    const res = await axios.get(
      `https://api.nasa.gov/insight_weather/?api_key=4XV4Fy9b0n9Om2jY4jsrcEYB26aPhvTOUvYd03Xb&feedtype=json&ver=1.0`
    );

    const { sol_keys, validity_checks, ...soldata } = res.data;

    setweekinfo(
      Object.entries(soldata).map(([sol, data]) => {
        return {
          sol: sol,
          maxtemp: data.AT.mx,
          mintemp: data.AT.mn,
          windspeed: data.HWS.av,
        };
      })
    );

    setmarsload(false);
  };

  const Setalert = (text) => {
    setalerttext(text);
    setTimeout(() => setalerttext(""), 3000);
  };
  const getimageofday = async () => {
    setloading(true);
    const res = await axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=kimrT0XXGPjDplMQ0bUIxe4zDzbz9m5DgOVru0Zy`
      )
      .then((res) => {
        setimgobj({
          imgurl: res.data.url,
          imgexp: res.data.explanation,
          imgtitle: res.data.title,
        });
      });

    setloading(false);
  };

  const Searchnasaimg = async (text) => {
    const res = await axios.get(
      `https://images-api.nasa.gov/search?q=${text}&media_type=image`
    );

    const final = res.data.collection.items.slice(0, 30).map((img) => {
      return {
        imgurl: img.links[0].href,
        imgtitle: img.data[0].title,
        imgid: img.data[0].nasa_id,
      };
    });
    console.log(final);
    setimggallery(final);
    setdefaultimg(false);
  };

  const getnasaimginfo = async (nasa_id) => {
    setnasaimginfoload(true);
    const res = await axios
      .get(`https://images-api.nasa.gov/search?nasa_id=${nasa_id}`)
      .then((res) => res.data)
      .then((data) => {
        return {
          photographer: data.collection.items[0].data[0].photographer,
          title: data.collection.items[0].data[0].title,
          descr: data.collection.items[0].data[0].description,
          date: data.collection.items[0].data[0].date_created,
          imgurl: data.collection.items[0].links[0].href,
        };
      });
    // console.log(res);
    setnasaimginfo(res);
    setnasaimginfoload(false);
  };

  return (
    <Router>
      <div className="App">
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/space-project"
                render={(props) => (
                  <Fragment>
                    <Imageofday
                      getimageofday={getimageofday}
                      loading={loading}
                      imgobj={imgobj}
                    />

                    <Weatherfinder />
                  </Fragment>
                )}
              ></Route>
              <Route
                exact
                path="/space-project/mars-weather"
                render={(props) => (
                  <Marsweatherfinder
                    marsload={marsload}
                    weekinfo={weekinfo}
                    getmarsweather={getmarsweather}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/space-project/natural-event"
                render={(props) => (
                  <Naturaleventfinder
                    eventload={eventload}
                    eventfinder={eventfinder}
                    events={events}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/space-project/gallery/:imgid"
                render={(props) => (
                  <Nasaimg
                    {...props}
                    getnasaimginfo={getnasaimginfo}
                    nasaimginfo={nasaimginfo}
                    nasaimginfoload={nasaimginfoload}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/space-project/gallery"
                render={(props) => {
                  return (
                    <Galleryhome
                      Setalert={Setalert}
                      Searchnasaimg={Searchnasaimg}
                      alerttext={alerttext}
                      imggallery={imggallery}
                      defaultimg={defaultimg}
                    />
                  );
                }}
              ></Route>
            </Switch>
          </div>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
