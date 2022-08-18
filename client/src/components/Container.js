import 'moment/locale/tr';

import Cities from './Cities';
import date from '../svg/date.svg';
import location from '../svg/location.svg';
import moment from 'moment';
import { useSelector } from 'react-redux';
import weather from '../svg/weather.svg';

function Container() {
  const data = useSelector(state => state.data);
  // console.log(data);
  return (
    <div className="container">
      <div className="left">
        <div className="top">
          <img className="location" src={location} alt="Location SVG Icon" />
          <Cities />
        </div>
        <div className="bot">
          <img
            className="icon"
            src={
              !data.icon
                ? weather
                : `http://openweathermap.org/img/wn/${data.icon}@2x.png`
            }
            alt="weather SVG Icon"
          />
        </div>
      </div>
      <div className="right">
        <div className="top">
          <p className="date">{moment(new Date()).format('LL')}</p>
          <img className="icon2" src={date} alt="Date SVG Icon" />
        </div>
        <div className="bot2">
          <p className="clock">{new Date().toLocaleTimeString()} İtibariyle</p>
          <div className="degree-container">
            <p className="degree">{data.temp}°</p>
            <p className="morning">
              Max <span>{data.max}°</span>
            </p>
            <p className="evening">
              Min <span>{data.min}° </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Container;
