const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ModeradorSchema = new Schema({

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
    }
});


var Moderador = mongoose.model('moderador', ModeradorSchema);
module.exports = Moderador;