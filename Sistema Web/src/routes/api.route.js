const express = require('express');
const router = express.Router();

const usuario = require("./api.usuario.route");
const report = require("./api.report.route");
const foto = require("./api.foto.router");

router.use("/usuario", usuario);
router.use("/report", report);
router.use("/foto", foto)

module.exports = router;