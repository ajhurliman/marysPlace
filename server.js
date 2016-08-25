// var proxy       = require('express-http-proxy');
// var httpProxy   = require('http-proxy');
var proxy = require('http-proxy-middleware');
var express     = require('express');
var server      = express();
process.env.PWD = process.cwd();

server.set('port', process.env.PORT || 3000);
server.use(express.static( process.env.PWD + '/build'));

var options = {
  target: 'https://sna.etapestry.com/v3messaging/service?WSDL',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/'
  },
  secure: false
};

var apiProxy = proxy(options);
server.use('/api', apiProxy);

server.listen( server.get('port'), function() {
  console.log( 'server started on port %d', server.get('port'))
});

module.exports = server;
