const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
var jwt = require("jsonwebtoken");
const config = require("../config");
const expressValidator = require('express-validator'); 
const EnviarNip = require('../MiddleWare/EnviarNip');
const fotoP = require('./api.fotoperfil.route');
const fotoperfil = require('../dataaccess/model/FotoPerfil');
const randomMin = 1000;
const randomMax = 9999;

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

 
router.post("/registro", [expressValidator.check('correo').isEmail()], (req, res) => {

    
    const errors = expressValidator.validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
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

    var nip = Math.floor(Math.random()*(randomMin + randomMax)).toString();

    //Creamos un objeto estudiante
    var usuario  = new Usuario({
        username: username,
        password: password,
        correo: correo,
        nip: nip,
        status: 'nuevo'

    });

    var foto = new fotoperfil({
        correo: correo,
        foto: "sin foto"
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

        foto.save(function (err, doc2) {
            if(err){
                res.status(500).json({
                    message: "Error al ejecutar save"
                })
                console.error(err);
                return false;
            }
            console.log('foto guardada')
            res.json({
                doc, doc2
                });
        });
    });

    EnviarNip.sendEmail(correo,nip);

    return 'Usuario guardado';

    
});


router.post("/login", (req, res) => {
    var correo = req.body.correo;
    var password = req.body.password;
    console.log("intento de conexión")

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


router.put("/activar", (req, res) => {
    //Recuperamos el ID de la URL
    var nip = req.body.nip
    //recuperamos las variables de cuerpo de la peticion
    var correo = req.body.correo
    var password = req.body.password

    //Verificamos existan
    if (correo === undefined || password === undefined) {
        res.status(400).json({
            "message": "Invalid body params"
        })
        return;
    }

    Usuario.findOneAndUpdate({
        correo : correo,
        password : password,
        nip : nip
    }, {
        status : 'activado',
        nip : ''
    }, function(err, doc){
        if (err) {
            res.status(500).json({
                message: "Error al ejecutar update"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

module.exports = router;