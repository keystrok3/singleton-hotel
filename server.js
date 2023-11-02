
/** Entry Point into App */

require('dotenv').config({ path: './config.env' });

const express = require('express');

// Environment variables
const PORT = process.env.PORT || 5000;


const app = express();




const server = app.listen(PORT, () => console.log(`Listening at http:127.0.0.1:${PORT}`));

//Handles server errors gracefully without crashing
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});



