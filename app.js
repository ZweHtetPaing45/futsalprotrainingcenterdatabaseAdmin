const express = require('express');
const {errorHandler} = require('./src/middlewares/ErrorHandling');
const cors = require('cors');
const api = require('./src/api/apiCalling');
const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(errorHandler);

app.use('/api',api);
module.exports = app;