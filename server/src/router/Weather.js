// import cron from '../cron/cron.js';

import express from 'express';
import getCityData from '../controller/getCityData.js';

const router = express.Router();

router.route('/data/:city').get(getCityData);

export default router;
