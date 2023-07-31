import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import { RingAttributes } from '../types/types';


export class RingInstance extends Model<RingAttributes> {}
RingInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_Url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'rings',
  }
);
