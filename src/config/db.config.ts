import { Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './rings.sqlite',
  logging: false,
});

export default db;
