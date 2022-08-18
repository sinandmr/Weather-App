import Daily from '../models/Daily.js';
import asyncHandler from '../utils/asyncHandler.js';

export default asyncHandler(async (req, res) => {
  try {
    const { city } = req.params;
    console.log(city);
    const all = await Daily.findAll({
      where: { city },
    });

    if (!all) throw 'Geçmiş kayıt bulunamadı';

    if (all.length == 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Geçmiş veriler henüz eklenmemiş.',
      });
    }
    res.status(200).json({
      status: 'success',
      results: all.length,
      dailies: all,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});
