import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mini-project', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
