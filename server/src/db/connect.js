import { Sequelize } from 'sequelize';

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST || 'localhost',
  dialect: 'postgres',
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connect.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();

export default sequelize;
