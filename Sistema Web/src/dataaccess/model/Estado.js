const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var EstadoSchema = new Schema({

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


var Estado = mongoose.model('estado', EstadoSchema);
module.exports = Estado;