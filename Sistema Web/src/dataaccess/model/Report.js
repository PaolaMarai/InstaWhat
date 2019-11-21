const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ReportSchema = new Schema({

    correo : {
        type: String,
        required: true,
        trim: true
    },
    
    idFoto : {
        type: String,
        required: true,
        trim: true
    },

    idReporte : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    fecha : {
        type: Date,
        required: false,
        trim: true
    },

    descripcion : {
        type: String,
        required: true,
        trim: true

    },

    asunto : {
        type: String,
        required: true,
        trim: true
    }
});

var Report = mongoose.model('report', ReportSchema);
module.exports = Report;