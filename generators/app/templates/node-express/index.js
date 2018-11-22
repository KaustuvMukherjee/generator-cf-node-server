/*

 */

const ProcessListener = require('./src/listeners/processListener.js');
const Application = require('./app.js');
const express = require('express');
const app = module.exports = express();


/*
    Listen to the process events.
 */
ProcessListener.listen();

/*
    Run the application.
 */
Application.run(app);
