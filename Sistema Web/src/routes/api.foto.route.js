const fs = require('fs');
const expres = require('express');
const imagen = require('../dataaccess/model/Foto');
const router = expres.Router();

router.route('/imagen').post(function(req,res){
    var correo = req.body.correo;
    var 
})