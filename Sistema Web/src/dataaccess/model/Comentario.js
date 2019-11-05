const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ComentarioSchema = new Schema({

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

    }

});


var Comentario = mongoose.model('comentario', ComentarioSchema);
module.exports = Comentario;