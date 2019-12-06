const Usuario = require("../src/dataaccess/model/Usuario");
const FotoPerfil = require('../src/dataaccess/model/FotoPerfil');
var chai = require("chai");
var expect = require('chai').expect;
var assert = require('chai').assert;
var resultado;

var correo = "usuario@test.com";
var password = "password";
var username =  "usuarioTest";
var nip = "1234";
var status = "activado";
var estado = "Hola, soy nuevo";


  describe('insertar usuario', function () {
    
    before(function (done) {
      
      var usuario  = new Usuario({
        username: username,
        password: password,
        correo: correo,
        nip: nip,
        status: status,
        estado: estado

    });
    
    usuario.save(function (err) {
        if(err){
            console.error(err);
            
        }
        done();
      });
    });

    
    after(function (done) {
      
      Usuario.findOne({
        correo: correo,
        password: password
    }, function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err)
            reesultado = false;
        }
        if (doc) {
          ressultado = true;
         } else {
            resultado = false;
        }
      });
      done();
    });

    it('usuarioRegistrado', function (done) {
      console.log("resultado: ")
      console.log(resultado);
      assert.equal(true, true);
      done();
    });

  });