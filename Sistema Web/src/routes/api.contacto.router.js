const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
const Contacto = require("../dataaccess/model/Contacto");
var jwt = require("jsonwebtoken");
const fotoP = require('./api.fotoperfil.route');
const tokenMW = require('../MiddleWare/TokenMW');
router.use(tokenMW);
const statusActivo = 'activado'

router.use("/fotoperfil", fotoP);

router.post("/", (req,res) => {
    var correo = req.body.correo;

   Contacto.find({
    correo: correo
    },
     function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la con la base de datos"
            })
            console.error(err)
            return
        }
        res.json(doc);
    });
});

router.post("/buscar", (req,res) => {
    var correo = req.body.correo;
    var correoContacto = req.body.correoContacto;
   Contacto.findOne({
    correo: correo,
    agregado: correoContacto
    },
     function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la con la base de datos"
            })
        }
        if (doc) {
                res.json(doc);
        } else {
            res.status(401).json({
                message: "Username not found"
            });
        }
    });
});

router.post("/agregar", (req,res) => {
    var correo = req.body.correo;
    var correoContacto = req.body.correoContacto;
    var relacion = correo
    if (!correoContacto) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }
    Contacto.find({
        relacion: correo
    },function (err,doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err);
            return
        }
        if(doc){
            res.json({
                message: "Este usuario ya es su contacto"
            })
            return
        }
    });
    Usuario.findOne({
        correo: correoContacto,
    }, function (err,user) {
        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err);
            return
        }else{
            if(user){
                Contacto.findOne({
                    correo: correoContacto,
                    agregado: correo
                },function(err,doc){
                    if (err) {
                        res.status(500).json({
                            message: "Error en la BD"
                        })
                        console.error(err);
                        return
                    }
                });
                var contacto = new Contacto({
                    correo: correo,
                    agregado: correoContacto,
                    relacion: relacion
                });
                contacto.save(function (err, ok) {
                    if(err){
                        res.status(500).json({
                            message: "Error al ejecutar save"
                        })
                        console.error(err);
                        return;
                    } 
                    res.json({
                        message: "agregado"
                    });
                });
            }
            else {
                res.status(401).json({
                    message: "Username not found"
                })
            }
        }
    });
});

module.exports = router;