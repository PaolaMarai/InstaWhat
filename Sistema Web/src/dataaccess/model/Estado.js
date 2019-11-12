const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var EstadoSchema = new Schema({

    descripcion : {
        type: String,
        required: false,
        trim: true
    },

    fecha : {
        type: String,
        required: true,
        trim: true
    },
    correo : {
        type: String,
        required: true,
        unique: true,
        trim: true
    }

});


var Estado = mongoose.model('estado', EstadoSchema);
module.exports = Estado;