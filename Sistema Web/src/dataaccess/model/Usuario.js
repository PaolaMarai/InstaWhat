const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var UsuarioSchema = new Schema({

    password : {
        type: String,
        required: true,
        trim: true
    },

    correo : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    username : {
        type: String,
        required: true,
        trim: true
    },
    
    nip : {
        type: String,
        required: true,
        trim: true
    },

    status : {
        type: String,
        required: true,
        trim: true
    },

    estado : {
        type: String,
        required: false,
        trim: true
    }

});


var Usuario = mongoose.model('usuario', UsuarioSchema);
module.exports = Usuario;