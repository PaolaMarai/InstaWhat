const express = require('express');
const router = express.Router();

const usuario = require("./api.usuario.route");
const report = require("./api.report.route");

router.use("/usuario", usuario);
router.use("/report", report);

module.exports = router;