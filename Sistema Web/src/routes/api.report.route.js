const express = require('express');
const router = express.Router();
const Reporte = require("../dataaccess/model/Reporte");

router.get("/", (res) => {
    Reporte.find(function(err, docs){
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

//Obtiene reportes de una foto
router.get("/report_list", (req, res) => {
    var idFoto = req.idFoto;

    if(idFoto === undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    Reporte.find({
        idFoto: idFoto
    }, function(err, docs){
        if (err) {
            res.status(500).json({
                message: "Data base error"
            })
            console.error(err)
            return
        } if (docs) {
            res.json(docs);
        } else {
            res.status(401).json({
                message: "Content not found"
            });
        }
    })

})

router.post("/", (req, res) => {

    //var idReporte = req.body.idReporte;
    //var fecha = req.body.fecha;
    var correo = req.body.correo;
    var idFoto = req.body.idFoto;
    var idReporte = correo+idFoto+"_R";
    var descripcion = req.body.descripcion;
    var asunto = req.body.asunto;
    var fecha = new Date();

    if(idReporte === undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    var reporte  = new Reporte({
        correo: correo,
        idFoto: idFoto,
        idReporte: idReporte,
        fecha: fecha,
        descripcion: descripcion,
        asunto: asunto
    });

    reporte.save(function (err, doc) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return false;
        }
        res.json(doc);
    });

    return;
});

module.exports = router;