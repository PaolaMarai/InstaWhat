var nodemailer = require('nodemailer');

const config = require("../config");
// email sender function
exports.sendEmail = function(correo, nip){

// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
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
transporter.sendMail(mailOptions, function(error, res){
    if (error){
        console.log(error);
    } else {
        console.log("Email sent");
    }
});
};