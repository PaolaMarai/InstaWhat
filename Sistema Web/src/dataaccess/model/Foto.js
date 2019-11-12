const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;


var FotoSchema = new Schema({

    correo : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
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