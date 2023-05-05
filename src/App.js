import Header from './components/Header';
import Instructions from './components/Instructions';
import Location from './components/Location';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let defaultZip = urlParams.get('zipcode') || localStorage.getItem("zipcode") || '';

  const googleMapsAPIKey = 'AIzaSyAvqIsxO_tC_U95S_9XCMjzSbfwmH6nKZ0';
  const [forcast, setForcast] = useState([]);
  const [selectedTemp, setRadioValue] = useState('fahrenheit');
  const [zipCode, setZipCode] = useState(defaultZip);
  const [location, setLocation] = useState('');
  const tempOptions = [
    { name: '\u2109', value: 'fahrenheit'},
    { name: '\u2103', value: 'celsius'}
  ];

  useEffect(() => {
    if (zipCode) {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},USA&key=${googleMapsAPIKey}`;

      axios.get(url)
        .then(response => {
          let data = response.data.results[0];

          if (data.address_components[1]?.long_name) {
            setLocation(data.address_components[1].long_name + ", " + data.address_components[3].long_name);
            getGridCoordinates(data.geometry.location);
          } else {
            setZipCode('');
            setLocation('');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [zipCode])

  function getGridCoordinates(coordinates) {
    if (coordinates) {
      let url = `https://api.weather.gov/points/${Object.values(coordinates).join(',')}`;

      axios.get(url)
        .then(response => {
          let forcastUrl = response.data.properties.forecastHourly;
          getWeather(forcastUrl);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  function getWeather(url) {
    axios.get(url)
      .then(response => {
        let data = response?.data?.properties?.periods ?? [];

        let daily = [];

        data.map(d => {
          let dateTime = moment(d.startTime).format('MMMM Do, YYYY')

          if (daily[dateTime]) {
            daily[dateTime].push(d);
          }
          else {
            daily[dateTime] = [d];
          }
        });

        setForcast(daily);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function toggleTemp(value) {
    setRadioValue(value);
  }

  function changeZipcode(value) {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);

    if (isValidZip) {
      localStorage.setItem("zipcode", value);
      setZipCode(value);
    } 
    else {
      setZipCode('');
      setLocation('');
    }
  }

  return (
    <Container className='text-center pt-4'>
      <Header 
        zipCode={zipCode}
        changeZipcode={changeZipcode.bind(this)}
      />
      {(location) ?
        <Location
          location={location}
          forcast={forcast}
          tempOptions={tempOptions}
          selectedTemp={selectedTemp}
          changeTempFormat={toggleTemp.bind(this)}
          zipCode={zipCode}
        /> : 
        <Instructions/> 
      }
    </Container>
  );
}

export default App;