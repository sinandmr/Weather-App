import Daily from '../models/Daily.js';
import cities from '../utils/cities.js';
import fetch from 'node-fetch';
import moment from 'moment';
import toDate from '../utils/unixToDate.js';

moment.locale('tr');

const API_KEY = process.env.OPEN_WEATHER_APP_API_KEY;

const cronCallback = async () => {
  try {
    cities.forEach(async city => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric&lang=tr`
      );
      const data = await response.json();
      const date = toDate(data.dt);

      const requiredData = {
        city,
        date: moment(date).format('LLL'),
        temp: data.main.temp,
        icon: data.weather[0].icon,
        min: data.main.temp_min,
        max: data.main.temp_max,
      };

      // Saat başı çekilen veri db'deki eklenen son veri ile aynı ise yeniden ekleme işlemi yapmaması için;

      const lastData = await Daily.findOne({
        where: {
          city: city.trim(),
          date: requiredData.date,
          temp: requiredData.temp,
        },
        order: [['createdAt', 'DESC']],
      });

      if (lastData) return; // Son veri mevcut ise aynı veriyi tekrardan db'ye eklememiz gereksiz olur. Bu yüzden return ediyoruz.

      const newData = await Daily.create(requiredData);
      if (!newData) throw 'Bir hata oluştu';
    });
  } catch (err) {
    console.error(err);
  }
};

export default cronCallback;
