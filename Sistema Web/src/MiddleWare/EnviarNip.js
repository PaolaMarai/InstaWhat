var nodemailer = require('nodemailer');

const config = require("../config");
// email sender function
exports.sendEmail = function(correo, nip){

// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD
        }
    });
// Definimos el email

var mailOptions = {
    from: config.EMAI,
    to: correo,
    subject: 'Validación de cuenta',
    text: nip
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};