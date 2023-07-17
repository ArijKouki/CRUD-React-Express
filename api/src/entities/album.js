import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

export class Album extends Model {}
Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
    },
    prix_unitaire: {
      type: DataTypes.FLOAT,
    },
    quantite: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Album',
    tableName: 'album',
    timestamps: false,
  }
);

export default Album;
