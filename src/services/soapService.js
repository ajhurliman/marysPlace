module.exports = function(app) {
  app.factory('soapService', ['$soap', function($soap) {
    var baseUrl = 'https://sna.etapestry.com/v3messaging/service?WSDL';

    return {
      HelloWorld: function() {
        return $soap.post(baseUrl, 'HelloWorld');
      }
    };

  }]);
};