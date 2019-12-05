const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
var jwt = require("jsonwebtoken");
const fotoP = require('./api.fotoperfil.route');
const tokenMW = require('../MiddleWare/TokenMW');
router.use(tokenMW);
const statusActivo = 'activado'

router.use("/fotoperfil", fotoP);


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

router.get("/user", (req, res) => {
    //Regresa un solo usuario
    
    var correo = req.body.correo;    
    if (!correo) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }

    Usuario.findOne({
        correo: correo
    }, function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la con la base de datos"
            })
            console.error(err)
            return
        }
        if (doc) {
            
            res.json(doc)

        } else {
            res.status(401).json({
                message: "Username not found"
            });
        }
    });
});

module.exports = router;