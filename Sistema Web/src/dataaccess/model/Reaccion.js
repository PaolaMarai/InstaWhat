const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ReaccionSchema = new Schema({

    correo : {
        type: String,
        require: true,
        trim: true
    },

    idFoto: {
        type: String, 
        require: true,
        trim: true
    },

    idReaccion: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },

    tipoReaccion: {
        type: String,
        require: true,
        trim: true
    }

});

var Reaccion = mongoose.model('reaccion',ReaccionSchema);
module.exports = Reaccion;