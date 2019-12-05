const express = require('express');
const router = express.Router();

const usuario = require("./api.usuario.route");
const report = require("./api.report.route");
const fotoperfil = require("./api.fotoperfil.route");
const registro = require("./api.registro.router");
const login = require("./api.login.route");

router.use("/usuario", usuario);
router.use("/report", report);
router.use("/fotoperfil", fotoperfil)
router.use("/registro", registro);
router.use("/login", login);


module.exports = router;