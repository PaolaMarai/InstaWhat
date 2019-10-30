const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var UsuarioGeneral = new Schema({

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
    }

});


var UsuarioGeneral = mongoose.model('UsuarioGeneral', UsuarioGeneralSchema);
module.exports = UsuarioGeneral;