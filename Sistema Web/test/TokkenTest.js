const token = require('../src/MiddleWare/InicioSesion');
const chai = require("chai");
const url = 'http://localhost:8080';
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

token.IniciarSesion();

