const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
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

router.use("/fotoperfil", fotoP);

router.post("/", [expressValidator.check('correo').isEmail()], (req, res) => {

    
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
        status: nuevoStatus,
        estado: nuevoEstado

    });

    //Ejecutamos la funcion guardar y verificamos el resultado
    usuario.save(function (err, user) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return;
        } 
        res.json({
            user
        });
    });

    FotoPerfilMW.registrarFotoPerfil(correo, correo+ "/fotoperfil/fotoperfil.txt");
    filesaver.CrearCarpetas(correo)
    //EnviarNip.sendEmail(correo,nip);

    return 'Usuario guardado'; 
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