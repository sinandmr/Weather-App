import { DataTypes } from 'sequelize';
import db from '../db/connect.js';

const Daily = db.define('daily', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
  },
  min: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  max: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  temp: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

(async () => {
  Daily.sync({ force: false });
})();

export default Daily;
