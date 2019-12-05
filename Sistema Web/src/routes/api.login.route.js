const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
var jwt = require("jsonwebtoken");
const config = require("../config");
const expressValidator = require('express-validator'); 
const fotoperfil = require('../dataaccess/model/FotoPerfil');

const statusActivo = 'activado'

router.post("/", (req, res) => {
    var correo = req.body.correo;
    var password = req.body.password;

    if (!correo || !password) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }

    Usuario.findOne({
        correo: correo,
        password: password
    }, function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err)
            return
        }
        if (doc) {
            if (doc.status == statusActivo ) {
                
                var tokenPayload = {
                    _id: doc._id,
                    username: doc.username
                }
    
                var token = jwt.sign(tokenPayload, config.TOKEN_SECRET, {
                    expiresIn: 60 * 60 * 24 * 7 // Expira en una semana
                })
    
                res.json({
                    token: token,
                    username: doc.username,
                    correo: doc.correo,
                    estado: doc.estado
                })

            } else {

                res.json({
                    token: doc.status
                })
            }

        } else {
            res.status(401).json({
                message: "Username not found"
            });
        }
    })

});

module.exports = router;