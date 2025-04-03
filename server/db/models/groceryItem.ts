import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig';

class GroceryItem extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public stock!: number;
}
GroceryItem.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'GroceryItem' });

export default GroceryItem;