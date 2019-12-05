const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
var jwt = require("jsonwebtoken");
const config = require("../config");
const expressValidator = require('express-validator'); 
const EnviarNip = require('../MiddleWare/EnviarNip');
const fotoP = require('./api.fotoperfil.route');
const fotoperfil = require('../dataaccess/model/FotoPerfil');
const FotoPerfilMW = require('../MiddleWare/FotoPerfil');
const filesaver = require('../MiddleWare/FIleSaver')
const tokenMW = require('../MiddleWare/TokenMW');
router.use(tokenMW);

const randomMin = 1000;
const randomMax = 9999;
const nuevoStatus = 'nuevo';
const nuevoEstado = 'Hola soy nuevo'
const statusActivo = 'activado'


router.get("/", (req, res) => {
    Usuario.find(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            })
            console.error(err);
            return;
        }

        res.json(docs);
    });
});



router.post("/editarestado", (req, res) => {

    var correo = req.body.correo;
    var estado = req.body.estado;

    Usuario.updateOne({
            correo : correo
        }, {
            estado : estado
        }, function(err, doc){
            if (err) {
                res.status(500).json({
                    message: "Error al ejecutar update"
                });
                console.error(err);
                return;
            } else {
                res.json(doc);
            }
           
        });
});


router.post("/editar", (req, res) => {

    var correo = req.body.correo;
    var estado = req.body.estado;

    Usuario.updateOne({
            correo : correo
        }, {
            estado : estado
        }, function(err, doc){
            if (err) {
                res.status(500).json({
                    message: "Error al ejecutar update"
                });
                console.error(err);
                return;
            } else {
                res.json(doc);
            }
           
        });
});


module.exports = router;