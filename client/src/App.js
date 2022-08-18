import './App.css';

import Container from './components/Container';
import OldData from './components/OldData';
import axios from 'axios';
import { changeLatLon } from './stores/Position';
import { setData } from './stores/Data';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const position = useSelector(state => state.position);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude, longitude } = pos.coords;
      dispatch(changeLatLon({ latitude, longitude }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getWeatherData() {
      const key = process.env.REACT_APP_WEATHER_API_KEY;
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?${
            position.name !== 'Adana'
              ? `q=${position.name}`
              : `lat=${position.latitude}&lon=${position.longitude}`
          }&appid=${key}&lang=tr&units=metric`
        );

        const newData = {
          city: data.name,
          temp: data.main.temp,
          min: data.main.temp_min,
          max: data.main.temp_max,
          icon: data.weather[0].icon,
        };
        dispatch(setData(newData));
      } catch {
        alert('Veri alınırken bir hata oluştu.');
      }
    }
    getWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <>
      <OldData />
      <Container />
    </>
  );
}

export default App;
