const { Sequelize } = require("sequelize");



const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres'
    });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Postgres DB Connection successful");
    } catch (error) {
        console.error(`Connection not successful: ${error}`);
    }
};


module.exports = { sequelize, connectDB };