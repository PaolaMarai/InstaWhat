const mongoose = require("../MongoConnect");
mongoose.set('useFindAndModify', true);
const Schema = mongoose.Schema;

var FotoPerfilSchema = new Schema({

    foto : {
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


var fotoPerfil = mongoose.model('fotoperfil', FotoPerfilSchema);
module.exports = fotoPerfil;