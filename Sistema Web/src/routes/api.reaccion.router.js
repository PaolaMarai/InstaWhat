const express = require('express');
const router = express.Router();
const Reaccion = require("../dataaccess/model/Reaccion");
const Foto = require("../dataaccess/model/Foto");

router.get("/", (req, res) =>{
    Reaccion.countDocuments(function(err,count){
        if(err){
            res.statusCode(500).json({
                "message":"Error al ejecutar la consulta"
            })
            console.error(err);
            return;
        }
        if(idFoto == undefined){
            res.status(400).json({
                "message": "Invalid body params"
            })
            return;
        }
        
        res.json(count);
    })
})

router.post("/", (req, res) => {
    Reaccion
})