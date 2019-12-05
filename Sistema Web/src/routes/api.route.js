const express = require('express');
const router = express.Router();

const usuario = require("./api.usuario.route");
const report = require("./api.report.route");
const foto = require("./api.foto.router");
const fotoperfil = require("./api.fotoperfil.route");
const registro = require("./api.registro.router");
const login = require("./api.login.route");
const contacto = require("./api.contacto.router");
//const reaccion = require("./api.reaccion.router");

router.use("/usuario", usuario);
router.use("/report", report);
router.use("/foto", foto);
router.use("/fotoperfil", fotoperfil)
router.use("/registro", registro);
router.use("/login", login);
router.use("/contacto",contacto);
//router.use("/reacion", reaccion);

module.exports = router;