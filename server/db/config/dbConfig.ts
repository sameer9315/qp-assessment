import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Create connection without specifying the database
const sequelizeForConnection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: { connectTimeout: 300000 },
    pool: { max: 5, min: 0, acquire: 300000, idle: 60000 },
    logging: false,
});

// Main connection for working with the database
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: { connectTimeout: 300000 },
    pool: { max: 5, min: 0, acquire: 300000, idle: 60000 },
    logging: false,
});

const createDatabase = async () => {
    try {
        console.log(`Creating database: ${process.env.DB}`);
        await sequelizeForConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB}\`;`);
        console.log('Database created or already exists.');
    } catch (error) {
        console.error('Error creating database:', error);
    }
};

const connectToDatabase = async () => {
    try {
        await createDatabase();
        await sequelize.authenticate();
        console.log('Connected to the database.');

        await sequelize.sync({ alter: true });
        console.log('Database models synchronized.');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

export { sequelize, connectToDatabase };