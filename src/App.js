import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Layout/Navbar';
import Imageofday from './components/Layout/Imageofday';
import Weatherfinder from './components/Weather/weatherfinder';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Marsweatherfinder from './components/mars-weather/marsweatherfinder';
import Naturaleventfinder from './components/Naturalevents/Naturaleventfinder';

import Nasaimg from './components/Layout/Gallery/Nasaimg';
import Galleryhome from './components/Layout/Gallery/Galleryhome';
import About from './components/About/About';

function App() {
  const [loading, setloading] = useState(false);
  const [imgobj, setimgobj] = useState({});
  const [alerttext, setalerttext] = useState('');
  const [imggallery, setimggallery] = useState([]);
  const [defaultimg, setdefaultimg] = useState(true);

  const [nasaimginfo, setnasaimginfo] = useState({});
  const [nasaimginfoload, setnasaimginfoload] = useState(false);
  const [imgGalleryload, setimgGalleryload] = useState(false);
  useEffect(() => {
    getimageofday();

    getmarsweather();
    //eslint - disable - next - line;
  }, []);
  const [marsload, setmarsload] = useState(false);

  const [weekinfo, setweekinfo] = useState([]);

  const getmarsweather = async () => {
    setmarsload(true);

    const res = await axios.get(
      `https://api.nasa.gov/insight_weather/?api_key=xRA5gFNAPdDB04reIimmetg6Of4zJXoCm9ycjoVZ&feedtype=json&ver=1.0`
    );
    const { sol_keys } = res.data;
    // console.log(arr);
    const arr = sol_keys.map((sk) => {
      const { PRE, Season } = res.data[sk];
      return {
        season: Season,
        sol: sk,
        Pavg: PRE.av,
        Pmin: PRE.mn,
        Pmax: PRE.mx,
      };
    });

    setweekinfo(arr);

    // setweekinfo(
    //   Object.entries(soldata).map(([sol, data]) => {
    //     return {
    //       sol: sol,
    //       maxtemp: ((data.AT.mx - 32) * (5 / 9)).toFixed(2),
    //       mintemp: ((data.AT.mn - 32) * (5 / 9)).toFixed(2),
    //       windspeed: data.HWS.av,
    //       earthdate: new Date(data.First_UTC).toDateString(),
    //       pressure: data.PRE.av,
    //     };
    //   })
    // );

    setmarsload(false);
  };
  //kimrT0XXGPjDplMQ0bUIxe4zDzbz9m5DgOVru0Zy
  const Setalert = (text) => {
    setalerttext(text);
    setTimeout(() => setalerttext(''), 3000);
  };
  const getimageofday = async () => {
    setloading(true);
    await axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=xRA5gFNAPdDB04reIimmetg6Of4zJXoCm9ycjoVZ`
      )
      .then((res) => {
        setimgobj({
          imgurl: res.data.url,
          imgexp: res.data.explanation,
          imgtitle: res.data.title,
          mediaType: res.data.media_type,
        });
      });

    setloading(false);
  };

  const Searchnasaimg = async (text) => {
    setimgGalleryload(true);
    const res = await axios.get(
      `https://images-api.nasa.gov/search?q=${text}&media_type=image`
    );

    const final = res.data.collection.items.map((img) => {
      return {
        imgurl: img.links[0].href,
        imgtitle: img.data[0].title.substr(0, 100),
        imgid: img.data[0].nasa_id,
      };
    });
    setimggallery(final);
    setdefaultimg(false);
    setimgGalleryload(false);
  };

  const getnasaimginfo = async (nasa_id) => {
    setnasaimginfoload(true);
    const res = await axios
      .get(`https://images-api.nasa.gov/search?nasa_id=${nasa_id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        return {
          photographer: data.collection.items[0].data[0].photographer,
          title: data.collection.items[0].data[0].title,
          descr: data.collection.items[0].data[0].description,
          date: new Date(
            data.collection.items[0].data[0].date_created
          ).toDateString(),
          imgurl: data.collection.items[0].links[0].href,
        };
      });
    // console.log(res);
    setnasaimginfo(res);
    setnasaimginfoload(false);
  };

  return (
    <Router>
      <div className='App'>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/space-project'
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
                path='/space-project/mars-weather'
                render={(props) => (
                  <Marsweatherfinder
                    marsload={marsload}
                    weekinfo={weekinfo}
                    {...props}
                  />
                )}
              ></Route>
              <Route
                exact
                path='/space-project/natural-event'
                component={Naturaleventfinder}
              ></Route>
              <Route
                exact
                path='/space-project/gallery/:imgid'
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
                path='/space-project/gallery'
                render={(props) => {
                  return (
                    <Galleryhome
                      Setalert={Setalert}
                      Searchnasaimg={Searchnasaimg}
                      alerttext={alerttext}
                      imggallery={imggallery}
                      defaultimg={defaultimg}
                      imgGalleryload={imgGalleryload}
                    />
                  );
                }}
              ></Route>
              <Route exact path='/space-project/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
