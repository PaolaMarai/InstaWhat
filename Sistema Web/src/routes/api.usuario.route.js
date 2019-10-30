const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
var jwt = require("jsonwebtoken");
const config = require("../config");

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

router.post("/", (req, res) => {
    //recuperamos las variables de cuerpo de la peticion
    var username = req.body.username
    var password = req.body.password
    var correo = req.body.correo


    //Verificamos existan
    if(correo === undefined ){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    //Creamos un objeto estudiante
    var usuario  = new Usuario({
        username: username,
        password: password,
        correo: correo,
        nip: '212',
        status: 'activado'

    });

    //Ejecutamos la funcion guardar y verificamos el resultado
    usuario.save(function (err, doc) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return false;
        }
        res.json(doc);
    });

    return 'Usuario guardado';
});


router.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log("intento de conexión")

    if (!username || !password) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }

    Usuario.findOne({
        username: username,
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
            var tokenPayload = {
                _id: doc._id,
                username: doc.username
            }

            var token = jwt.sign(tokenPayload, config.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24 * 7 // Expira en una semana
            })

            res.json({
                token: token
            })

        } else {
            res.status(401).json({
                message: "Username not found"
            });
        }
    })

});

module.exports = router;