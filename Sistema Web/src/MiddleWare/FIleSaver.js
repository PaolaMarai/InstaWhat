var fs = require('fs');

exports.SaveFile = function(path, data, err){

    fs.writeFile(path,data, function(err) {
        if (err) {
            console.error(err);
            return err;
        }

    });
};

exports.CrearCarpetas = function(path){

    fs.mkdirSync(path);
    fs.mkdirSync(path + "/fotoperfil");
    var fotoperfil = fs.readFileSync("fotoperfil.txt")
    fs.writeFileSync(path + "/fotoperfil/fotoperfil.txt", fotoperfil)
    fs.mkdirSync(path + "/fotos");
    
};