const usuario = require("../src/routes/api.usuario.route.js");
const app = require("../src/app.js")


var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

var user 

describe('Usuarios guardados', () =>{
    it('usuarios guardados', done =>{
        chai.requiest(app)
        .get(usuario)
        .end(function (err, res){
            if(err) done(err);

            done();

            console.log('code', res.statusCode)
        });
    }).timeout(0);
});
