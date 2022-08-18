import 'dotenv/config';

import cors from 'cors';
import cron from 'node-cron';
import cronCallback from './src/cron/cron.js';
import express from 'express';
import morgan from 'morgan';
import weatherRoute from './src/router/Weather.js';

// Cron Job çalıştırır. Saatte bir güncel verileri DB'ye kaydeder.
cron.schedule('0 * * * *', cronCallback); // Saatte bir
// cron.schedule('*/2 * * * *', cronCallback); // 2 Dakikada bir

// Express
const app = express();
app.use(cors());

// Method
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  app.disable('x-powered-by');
  app.disable('etag');
  next();
});

// Middlewares
app.use(express.json());
app.use('/api/v1/', weatherRoute);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Bu endpoint kullanılmıyor',
  });
});

// Listen server
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server On | Port: ${port}`);
});
