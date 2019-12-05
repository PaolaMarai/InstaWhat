const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ContactoSchema = new Schema({

    correo: {
        type: String,
        required: true,
        trim: true
    },

    agregado: {
        type: String,
        required: true,
        trim: true
    },

    relacion : {
        type: String,
        required: true,
        trim: true
    }

});


var Contacto = mongoose.model('contacto', ContactoSchema);
module.exports = Contacto;