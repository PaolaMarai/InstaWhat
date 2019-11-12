const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var FotoSchema = new Schema({  
    descripcion : {
        type: String,
        required: false,
        trim: true
    },

    fecha : {
        type: Date,
        required: true,
        trim: true

    },

    ubicacion : {
        type: String,
        required: true,
        trim: true
    }

});


var Foto = mongoose.model('foto', FotoSchema);
module.exports = Foto;