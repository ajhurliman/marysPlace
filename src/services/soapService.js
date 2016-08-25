module.exports = function(app) {
  app.factory('soapService', ['$soap', function($soap) {
    // var baseUrl = 'https://sna.etapestry.com/v3messaging/service?WSDL';
    var baseUrl = '/proxy';
    $soap.setCredentials('ajhurlimantest', 'asdf1234');

    return {
      addAccount: function() {
        return $soap.post(baseUrl, 'addAccount', 
          {
            account: {
              nameFormat: 1,
              country: 'US'
            },
            createFieldAndValues: true
          });
      }
    };

  }]);
};