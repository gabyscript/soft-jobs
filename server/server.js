
const express = require('express');
const cors = require ('cors');
const jwt = require("jsonwebtoken");

const serverRoutes = require('./routes/serverRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', serverRoutes);

app.use('*', (req, res) => {
    res.send("Ruta no encontrada/ruta errónea")
})

app.listen(3000, () => console.log("El servidor se ha activado correctamente en el puerto 3000"));