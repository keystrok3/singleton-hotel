
/** Entry Point into App */

require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');

// Environment variables
const PORT = process.env.PORT || 5000;

connectDB()

sequelize.sync({ force: true })
    .then(() => {
        console.log("User table created successfully");
    })
    .catch((error) => {
        console.error(`Could not create User table: \n ${error}`)
    });

const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));


const server = app.listen(PORT, () => console.log(`Listening at http:127.0.0.1:${PORT}`));

//Handles server errors gracefully without crashing
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});



