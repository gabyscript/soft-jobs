
const serverController = require('../controllers/serverController');
const {reportarConsulta} = require('../services/serverServices');

const express = require('express');
const app = express();

app.get('/usuarios', reportarConsulta, serverController.show);

app.post('/usuarios', serverController.create);

app.post('/login', serverController.verify);

module.exports = app;