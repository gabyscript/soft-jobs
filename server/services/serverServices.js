
const pool = require('../database/conection');
const express = require('express');
const pg = require('pg');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());


const obtenerUsuarios = async (email) => {    
    const values = [email];
    const consulta = "SELECT email, rol, lenguage FROM usuarios WHERE email = $1";
    const {rows} = await pool.query(consulta, values);     
    return rows;
}

const verificarUsuario = async (email, password) => {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1 ";
    
    const { rows: [usuario], rowCount} = await pool.query(consulta, values);

    const { password: passwordEncriptada} = usuario; 
    const passwordCorrecta = bcrypt.compareSync(password, passwordEncriptada);    

    if (!passwordCorrecta || !rowCount) 
        throw { code: 401, message: "Email o contraseña incorrecta"} ;     
}

const registrarUsuario = async (usuario) => {
    let {email, password, rol, lenguage} = usuario;
    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    const values = [email, passwordEncriptada, rol, lenguage];
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
    await pool.query(consulta, values);    
}

const reportarConsulta = async (req, res, next) => {
    const url = req.url
    console.log(`
        Hoy ${new Date()}
        Se ha recibido una consulta en la ruta ${url}
        `)
    next()
}
    

module.exports = {obtenerUsuarios, verificarUsuario, registrarUsuario, reportarConsulta};