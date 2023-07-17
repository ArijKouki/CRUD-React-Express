import express from 'express';
import cors from 'cors';
import albumController from './controllers/albumController.js';
import { Sequelize } from 'sequelize';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/images', express.static('src/images'));


const sequelize = new Sequelize('mini-project', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true,
});

sequelize
  .authenticate()
  .then(() => {
    app.use('/albums', albumController);
    
    app.listen(8800, () => {
      console.log('Connected to backend');
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
