
/** Entry Point into App */

require('dotenv').config({ path: './config.env' });

const express = require('express');

// Environment variables
const PORT = process.env.PORT || 5000;


const app = express();




app.listen(PORT, () => console.log(`Listening at http:127.0.0.1:${PORT}`));
