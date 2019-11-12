const fotoPefil = require('../dataaccess/model/FotoPerfil');


// email sender function
exports.registrarFotoPerfil = function(correo){

    var foto = new fotoPefil({
        correo: correo,
        foto: ""
    });

    foto.save(function (err, fotoperfil) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
        }
            
    });
        
}
