const fotoPefil = require('../dataaccess/model/FotoPerfil');


// email sender function
exports.registrarFotoPerfil = function(correo, path){

    var foto = new fotoPefil({
        correo: correo,
        foto: path
    });

    foto.save(function (err, fotoperfil) {
        if(err){
            console.error(err);
        }
            
    });
        
}
