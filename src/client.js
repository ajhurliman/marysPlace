'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
// require('../vendor/js/soapclient');
require('../vendor/js/angular.soap');


var app = angular.module('nochildApp', ['ui.router', 'ui.bootstrap', 'angularSoap']);

app.config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.when('', '/landing').otherwise('/landing');

  $stateProvider
    .state('landing', {
      url: '/landing',
      templateUrl: './partials/home.html',
      controller: 'mainController'
    })

    .state('donate', {
      url: '/donate',
      templateUrl: './partials/donate.html',
      controller: 'mainController'
    });

});

//services
require('./services/soapService')(app);

app.controller('mainController', function($scope, $http, soapService) {
  $scope.donaters = [
    {
      name: "Mary's Place",
      amtRaised: '$105,375',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Bank of America",
      amtRaised: '$25,200',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Windermere Real Estate",
      amtRaised: '$22,120',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Seattle Interactive Conference",
      amtRaised: '$18,830',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Dick's Drive-In Restaurants",
      amtRaised: '$105375',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Lennar Multifamily Communities",
      amtRaised: '$105375',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Sync Fitness",
      amtRaised: '$105375',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "G2 Web Services",
      amtRaised: '$105375',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Pemco Insurance",
      amtRaised: '$105375',
      imgUrl: 'http://sheenholders.com/200x200'
    }
  ];

  $scope.storyIsVisible = false;

  $scope.toggleStoryVisibility = function() {
    $scope.storyIsVisible = !$scope.storyIsVisible;
  };

  $scope.testSoap = function() {
    soapService.HelloWorld().then(function(res) {
      alert(res);
    });
  };

  $scope.ping = function() {
    $http.get('/api').then(function(res, err) {
      if (err)
        console.log(err);
      console.log(res);
    });
  };

  $scope.setCredentials = function() {
    $http({
      method: 'POST',
      // url: 'https://sna.etapestry.com/v3messaging/service?WSDL',
      url: '/api',
      headers: {
        'Content-Type': 'text/xml',
        'charset': 'UTF-8'
      },
      data: '<?xml version="1.0" encoding="UTF-8"?> <SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="etapestryAPI/service"> <SOAP-ENV:Body> <tns:login xmlns:tns="etapestryAPI/service"> <String_1 xsi:type="xsd:string">ajhurlimantest</String_1> <String_2 xsi:type="xsd:string">asdf1234</String_2> </tns:login> </SOAP-ENV:Body> </SOAP-ENV:Envelope>'
    }).then(function(res, err) {
      if (err)
        console.log(err);
      console.log(res);
    });
    // soapService.addAccount().then(function(res) {
    //   console.log(res);
    // });
  };
});

//sections
require('./components/donateSection')(app);
require('./components/storySection')(app);
require('./components/topDonations')(app);
require('./components/footer')(app);
