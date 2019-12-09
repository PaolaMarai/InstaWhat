const express = require('express');
const router = express.Router();
const Foto = require("../dataaccess/model/Foto");
const fileSaver = require('../MiddleWare/FileSaver');
const tokenMW = require('../MiddleWare/TokenMW');
router.use(tokenMW);
const dirfoto = '/fotos/';
const extension = '.txt';

router.get("/", (res) => {
    Foto.find({}).sort('-date').exec(function(err, docs){
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

router.get("/content", (req, res) => {
    Foto.find(function(err, docs){
        if(idFoto === undefined){
            res.status(400).json({
                "message": "Invalid body params"
            })
            return false;
        }
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

router.put("/publicar", (req, res) => {
    var foto = req.body.foto;
    var descripcion = req.body.descripcion;
    var correo = req.body.correo;
    var fecha = new Date();

    if(foto === undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    var publicacion  = new Foto({
        ubicacion: "temporal",
        fecha: fecha,
        descripcion: descripcion,
        correo: correo
        
    });

    publicacion.save(function (err, doc) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return false;
        }

        fileSaver.SaveFile(correo + dirfoto + doc._id + extension,foto, 
        function(err){
            if (err) {
                res.status(500).json({
                    message: "Error al ejecutar update"
                })
                console.error(err);
                return;
            } 
        });

        Foto.updateOne({
            _id : doc._id
        }, {
            ubicacion : "../../" + correo + dirfoto + doc._id + extension
        }, function(err, doc){
            if (err) {
                res.status(500).json({
                    message: "Error al ejecutar update"
                })
                console.error(err);
                return;
            } 
        });
        res.json(doc);
    });
    return 'Foto guardada';
});

router.post("/reaccion", (req, res) => {
    var reaccion = req.body.reaccion;
    var idFoto = req.body.reaccion;

    if(idFoto != undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    Foto.save(function (err, doc) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return false;
        }
        res.json(doc);
    });

    return 'Reacción asignada';
});



router.post("/consultarpublicaciones", (req, res) => {
    var skip = req.body.skip;
    var limit = req.body.limit;

    if(skip === undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    Foto.find(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            });
            console.error(err);
            return;
        }

        var jsonArrayResponse = [];
        var fs = require('fs');
        docs.forEach((doc)=> {
            var data = fs.readFileSync(doc.ubicacion).toString();
            
            var jsonPublicacion = {
                correo : doc.correo,
                descripcion : doc.descripcion,
                fecha : doc.fecha,
                foto : data
            };
            jsonArrayResponse.push(jsonPublicacion);
        });

         res.json(jsonArrayResponse);
    }).skip(skip).limit(limit);

    return;
});



router.delete("/delete", (req, res) =>{
    var idFoto= req.body.idFoto;

    if(idFoto != undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    Foto.findByIdAndDelete({
        idFoto: idFoto
    }, function(err){
        if(err){
            res.status(500).json({
                message: "Error en la base"
            });
            return false;
        } else {
            res.json({
                message: "Ok"
            });
        }
    });
});

module.exports = router;