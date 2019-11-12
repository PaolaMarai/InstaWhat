const express = require('express');
const router = express.Router();
const fotoperfil = require("../dataaccess/model/FotoPerfil");

router.get("/", (req, res) => {
    var correo = req.body.correo;
    if (!correo) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }

    fotoperfil.find({
        correo: correo
    }, function(err, docs){
        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err)
            return
        }
        res.json(docs);
    });

});


router.put("/editar", (req, res) => {
    //Recuperamos variables de la petición
    var correo = req.body.correo
    var foto = req.body.foto
    //Verificamos existan
    if (correo === undefined) {
        res.status(400).json({
            "message": "Invalid body params"
        })
        return;
    }

    fotoperfil.updateOne({
        correo : correo
    }, {
        foto : foto
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

