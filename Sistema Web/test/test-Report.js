
/*
const report = require("../src/routes/api.report.route.js");
const app = require("../src/app.js");

var chai = require("chai");
var assert    = require("chai").assert;
const url = 'http://localhost:8080';
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('Insert a report: ',()=>{
  it('should insert a report', (done) => {
  
    chai.request(url)
    .post('/api/report')
    .send({
        idReporte: "1",
        descripcion: "descripcion",
        asunto: "Maltarato animal"    
    })
    .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(200);
      done()
      assert.equal(result, "Repote guardado")
    });
  }).timeout(0);
});

describe('Insert a report: ',()=>{
    it('should insert a report w int on id', (done) => {
    
      chai.request(url)
      .post('/api/report')
      .send({
          idReporte: 1,
          descripcion: "descripcion",
          asunto: "Maltarato animal"    
      })
      .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(200);
        done()
        assert.equal(result, false)
      });
    }).timeout(0);
  });

  describe('Insert a report: ',()=>{
    it('should insert a report w int on description', (done) => {
    
      chai.request(url)
      .post('/api/report')
      .send({
          idReporte: "1",
          descripcion: 24,
          asunto: "Maltarato animal"    
      })
      .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(200);
        done()
        assert.equal(result, false)
      });
    }).timeout(0);
  });

  describe('Insert a report: ',()=>{
    it('should insert a report w int on asunto', (done) => {
    
      chai.request(url)
      .post('/api/report')
      .send({
          idReporte: "1",
          descripcion: "descripcion",
          asunto: 434    
      })
      .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(200);
        done()
        assert.equal(result, false)
      });
    }).timeout(0);
  });

describe('get all reports: ',()=>{
  it('should get all reports', (done) => {
    chai.request(url)
    .get('/api/reports')
    .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  }).timeout(0);
});

*/