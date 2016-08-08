'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('../vendor/js/soapclient');
require('../vendor/js/angular.soap');


var app = angular.module('nochildApp', ['ui.router', 'ui.bootstrap']);

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

app.controller('mainController', function($scope) {
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
});

//sections
require('./components/donateSection')(app);
require('./components/storySection')(app);
require('./components/topDonations')(app);
require('./components/footer')(app);

//services
require('./services/soapService')(app);
