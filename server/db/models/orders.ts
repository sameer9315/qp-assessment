import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig';

class Order extends Model {}
Order.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    items: { type: DataTypes.JSON, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' }
}, { sequelize, modelName: 'Order' });

export default Order;