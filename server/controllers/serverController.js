
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


const {obtenerUsuarios, verificarUsuario, registrarUsuario, reportarConsulta} = require('../services/serverServices');

const app = express();
app.use(express.json());


const controlador = {

    show: async (req, res) => {
        try {  
                     
            const Authorization = req.header("Authorization");
            const token = Authorization.split("Bearer ")[1];
            jwt.verify(token, "az_AZ");  
            console.log(token);             
            const { email } = jwt.decode(token);             
            const datos  = await obtenerUsuarios(email) ;              
            res.json(datos) ;       

        } catch(error){
            res.status(error.code || 401).send(error)
        }               
    },   

    verify: async (req, res) => {
        try {
            const {email, password} = req.body;
            await verificarUsuario(email, password);
            const token = jwt.sign({ email }, "az_AZ", { expiresIn: 300 });
            res.send(token);
            console.log(token);
            console.log("Has ingresado a tu sesión correctamente")
        } catch (error) {
            console.log(error);            
            res.status(error.code || 500).send(error)
        }
    },
    create: async (req,res) => {
        try {
            const usuario = req.body;
            await registrarUsuario(usuario);
            res.send("Usuario creado con éxito");
        } catch (error) {
            res.status(500).send(error);
        }
    },
    
}

module.exports = controlador;