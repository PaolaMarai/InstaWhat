const express = require('express');
const router = express.Router();
const fotoperfil = require("../dataaccess/model/FotoPerfil");
const fileSaver = require('../MiddleWare/FIleSaver');
const tokenMW = require('../MiddleWare/TokenMW');
//router.use(tokenMW);

router.get("/", (req, res) => {
    var correo = req.body.correo;
    console.log(req.body);
    console.log(correo);
    if (!correo) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }
    fotoperfil.findOne({
        correo: correo
    }, function (err, docFoto) {
        
        if(err) {
            res.status(401).json({
                message: "Username not found"
            });
        } else {
            var fs = require('fs'), readline = require('readline');
            var data = fs.readFileSync(docFoto.foto).toString();
           res.json({
                foto: data
        })
        }
    }
    )
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
    

    
    var path = correo + "/fotoperfil/fotoperfil.txt";

    fileSaver.SaveFile(path,foto, 
        function(err){
            if (err) {
                res.status(500).json({
                    message: "Error al ejecutar update"
                })
                console.error(err);
                return;
            }
            res.json(doc);
        });


    fotoperfil.updateOne({
        correo : correo
    }, {
        foto : path
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

