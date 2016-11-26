// var proxy       = require('express-http-proxy');
// var httpProxy   = require('http-proxy');
var util          = require('util');
var request       = require('request');
var express       = require('express');
var xml2js        = require('xml2js').parseString;
var server        = express();
var loginId       = process.env.LOGINID || 'ajhurlimantest';
var loginPassword = process.env.PASSWORD || 'asdf1234';
process.env.PWD   = process.cwd();

//request stuff
request = request.defaults({jar: true});

var optionsBody = '<?xml version="1.0" encoding="UTF-8"?> <SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="etapestryAPI/service"> <SOAP-ENV:Body> <tns:login xmlns:tns="etapestryAPI/service"> <String_1 xsi:type="xsd:string">' +
                  loginId +
                  '</String_1> <String_2 xsi:type="xsd:string">' +
                  loginPassword +
                  '</String_2> </tns:login> </SOAP-ENV:Body> </SOAP-ENV:Envelope>';

var options = {
  url: 'https://sna.etapestry.com/v3messaging/service?WSDL',
  jar: true,
  headers: {
    'Content-Type': 'text/xml',
    'charset': 'UTF-8'
  },
  body: optionsBody
};

var queryOptions = {
    url: 'https://sna.etapestry.com/v3messaging/service?WSDL',
    headers: {
      'Content-Type': 'text/xml',
      'charset': 'UTF-8',
      'JSESSIONID': ''
    },
    body: '<?xml version="1.0" encoding="UTF-8"?> <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="etapestryAPI/service" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"> <SOAP-ENV:Body> <tns:getQueryResultStats xmlns:tns="etapestryAPI/service"> <String_1 xsi:type="xsd:string">Base</String_1> <String_2 xsi:type="xsd:string">ncsoTotal</String_2> </tns:getQueryResultStats> </SOAP-ENV:Body> </SOAP-ENV:Envelope>'
  };

var totalRaised;
var testCounter = 0;

request.post(options , function(err, res, body) {
  login(err, res, body);
});

var interval = setInterval(function() {
  request.post(options , function(err, res, body) {
    login(err, res, body);
  });

// }, 3000);
}, 600000);

function login(err, res, body) {
  var parsedBody;
  var redirectUrl;

  if (!err && res && res.statusCode == 200) {
    // console.log(body);
    console.log(JSON.stringify(res, 0, 2));

    if (res.headers['set-cookie']) {
      var cookies = res.headers['set-cookie'][0];
      cookies = cookies.split(';');
      queryOptions.headers.JSESSIONID = cookies[0].split('=')[1];
      console.log('cookie set: ', queryOptions.headers.JSESSIONID);
    }

    parsedBody = xml2js(res.body, function(error, resultJson) {
      console.log(util.inspect(resultJson, false, null));

      if (resultJson['env:Envelope'] && 
          resultJson['env:Envelope']['env:Body'] && 
          resultJson['env:Envelope']['env:Body'][0] &&
          resultJson['env:Envelope']['env:Body'][0]['ns0:loginResponse'] && 
          resultJson['env:Envelope']['env:Body'][0]['ns0:loginResponse'][0] &&
          resultJson['env:Envelope']['env:Body'][0]['ns0:loginResponse'][0]['result'] && 
          resultJson['env:Envelope']['env:Body'][0]['ns0:loginResponse'][0]['result'][0] && 
          resultJson['env:Envelope']['env:Body'][0]['ns0:loginResponse'][0]['result'][0]['_']) {
            redirectUrl = resultJson['env:Envelope']['env:Body'][0]['ns0:loginResponse'][0]['result'][0]['_'];
            queryOptions.url = redirectUrl;
            options.url = redirectUrl;
            console.log('url redirected to: ', redirectUrl);
            
            request.post(options , function(newErr, newRes, newBody) {
              login(newErr, newRes, newBody);
            });
      } else {
        requestJournalEntries();  
      }
    });

    
  }
}

function requestJournalEntries() {
  console.dir('    BEGIN QUERY');
  console.dir(queryOptions);
  console.dir('    END QUERY');
  request.post(queryOptions, function(err, res, body) {
    console.log(res.body);
    if (!err && res.statusCode == 200) {
      console.log('no error');  
      var parsedJson = xml2js(res.body, function(err, resultJson) {
        console.log(util.inspect(resultJson, false, null));
        totalRaised = resultJson['env:Envelope']['env:Body'][0]['ns0:QueryResultStats'][0]['gifted'][0]['_'];
        console.log(totalRaised);
        // testCounter++;
      });
    } else if (err) {
      console.log(err)
    }
  });
}

//end request stuff

server.set('port', process.env.PORT || 3000);
server.use(express.static( process.env.PWD + '/build'));

server.get('/getTotal', function(req, res) {
  res.json({total: totalRaised}); 
  // res.json({total: 50000}); //remove before flight
});

// var options = {
//   target: 'https://sna.etapestry.com/v3messaging/service?WSDL',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api': '/'
//   },
//   secure: false
// };

// var apiProxy = proxy(options);
// server.use('/api', apiProxy);

server.listen( server.get('port'), function() {
  console.log( 'server started on port %d', server.get('port'))
});

module.exports = server;
