const express = require('express');
const router = express.Router();

const usuario = require("./api.usuario.route");

router.use("/usuario", usuario);

module.exports = router;