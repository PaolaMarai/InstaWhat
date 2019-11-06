const express = require('express');
const router = express.Router();
const Report = require("../dataaccess/model/Report");

router.get("/", (res) => {
    Report.find(function(err, docs){
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
    var idReporte = req.body.idReporte;
    //var fecha = req.body.fecha;
    var descripcion = req.body.descripcion;
    var asunto = req.body.asunto;
    var dat = new Date();

    if(idReporte === undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return false;
    }

    var report  = new Report({
        idReporte: idReporte,
        fecha: dat,
        descripcion: descripcion,
        asunto: asunto
    });

    report.save(function (err, doc) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return false;
        }
        res.json(doc);
    });

    return 'Repote guardado';
});

module.exports = router;