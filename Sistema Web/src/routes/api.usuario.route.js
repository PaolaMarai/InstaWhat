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
const estado = require('../dataaccess/model/Estado');
const randomMin = 1000;
const randomMax = 9999;
const nuevoStatus = 'nuevo';
const nuevoEstado = 'Hola soy nuevo'
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
        status: nuevoStatus

    });

    var date = new Date();

    var estadoNuevo = new estado({
        descripcion: nuevoEstado,
        correo: correo,
        fecha: date.getDate().toString()
    });

    //Ejecutamos la funcion guardar y verificamos el resultado
    usuario.save(function (err, user) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return false;
        }

        estadoNuevo.save(function (err, estado) {
            if(err){
                res.status(500).json({
                    message: "Error al ejecutar save"
                })
                console.error(err);
                return false;
            }
            FotoPerfilMW.registrarFotoPerfil(correo);
                res.json({
                    user
            });
        });
    });
    EnviarNip.sendEmail(correo,nip);

    return 'Usuario guardado'; 
});


router.post("/login", (req, res) => {
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
                    token: token
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

    Usuario.updateOne({
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