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
router.post("/reportes", (req, res) => {
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

    Reporte.findOne({idReporte: idReporte},  
        function(err, docs){
        if (err) {
            res.status(500).json({
                message: "Data base error"
            })
            console.error(err)
            return
        } if (docs) {
            res.json({
                message: "Reporte existente"
            });
        } else {
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
        }
    });
});

router.delete("/eliminar", (req,res)=>{
    idFoto = req.body.idFoto;
    Reporte.remove({
        idFoto: idFoto
    },function(err){
        if (err) {
            res.status(500).json({
                message: "Data base error"
            })
            console.error(err)
            return
        } else{
            res.status(200).json({
                message: "OK"
            });
        }
    })
})

module.exports = router;