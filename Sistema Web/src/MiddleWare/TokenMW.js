var jwt = require("jsonwebtoken");
const config = require("../config");

function tokenVerificationMW(req, res, next){
    var token = req.headers["authorization"]
    if(!token){
        res.status(401).json({
            "message": "Token is needed"
        })
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, config.TOKEN_SECRET, function(err, payload){
        if(err){
            console.error(err)
            res.status(500).json({
                "message": "Error al decodificar token"
            });
        } else {
            req.user = payload
            next()
        }
    });
}

module.exports = tokenVerificationMW;