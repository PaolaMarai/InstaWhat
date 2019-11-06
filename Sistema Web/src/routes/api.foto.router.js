const express = require('express');
const router = express.Router();
const Foto = require("../dataaccess/model/Foto");

router.get("/", (res) => {
    Foto.find(function(err, docs){
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

router.post("/", (req, res) => {
    var idFoto = req.body.idFoto;
    var descripcion = req.body.descripcion;
    var url = req.body.url;
    var fecha = new Date();

    if(idFoto === undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    var Foto  = new Foto({
        idFoto: idFoto,
        fecha: fecha,
        descripcion: descripcion,
        url: url
        
    });

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

module.exports = router;