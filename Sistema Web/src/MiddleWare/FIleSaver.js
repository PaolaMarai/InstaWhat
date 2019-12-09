var fs = require('fs');
const dirRaiz = "../../";

exports.SaveFile = function(path, data, err){

    fs.writeFile(dirRaiz + path,data, function(err) {
        if (err) {
            console.error(err);
            return;
        }

    });
};

exports.CrearCarpetas = function(path){

        fs.mkdir(dirRaiz + path, {recursive: true}, err => {
            if(err) {
                console.err(err);
            } else {
                fs.mkdirSync(dirRaiz + path + "/fotoperfil");
                var fotoperfil = fs.readFileSync("fotoperfil.txt");
                fs.writeFileSync( dirRaiz + path + "/fotoperfil/fotoperfil.txt", fotoperfil)
                fs.mkdirSync(dirRaiz + path + "/fotos");
            }
        });
    
};

exports.getFoto = function(path){
    return fs.readFileSync(path).toString();
};