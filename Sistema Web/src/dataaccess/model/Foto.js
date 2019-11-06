const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var FotoSchema = new Schema({

    idFoto : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    descripcion : {
        type: String,
        required: true,
        trim: true
    },

    fecha : {
        type: Date,
        required: true,
        trim: true

    },

    reaccion : {
        type: String,
        required: false,
        trim: true
    },
    
    url : {
        type: String,
        required: true,
        trim: true
    }

});


var Foto = mongoose.model('foto', FotoSchema);
module.exports = Foto;