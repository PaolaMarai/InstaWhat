/*
const usuario = require("../src/routes/api.usuario.route.js");
const app = require("../src/app.js");
var chai = require("chai");
const url = 'http://localhost:8080';
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);




describe('Insert a usuario: ',()=>{
  it('should insert a usuario', (done) => {
  
    chai.request(url)
    .post('/api/usuario/Registro')
    .send({
      username: "prueba4",
      password: "1234",
      correo: "soy-yonotu@hotmail.com"
    })
    .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(200);
      done()
    });
  }).timeout(0);
});

describe('Llogin: ',()=>{
  
  it('should llogin', (done) => {
    chai.request(url)
    .post('/api/usuario/login')
    .send({
      password: "1234",
      correo: "fmch@hotmail.com"
    })
    .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(200);
      done()
    });
  }).timeout(0);
});

describe('get all usuarios: ',()=>{
  it('should get all usuarios', (done) => {
    chai.request(url)
    .get('/api/usuario')
    .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  }).timeout(0);
});
*/