'use strict';

var angular = require('angular');
require('../vendor/js/soapclient');
require('../vendor/js/angular.soap');

var app = angular.module('nochildApp', []);



app.controller('mainController', function($scope) {
  $scope.name = 'james';
});

//sections
require('./components/donateSection')(app);
require('./components/storySection')(app);
require('./components/topDonations')(app);
require('./components/footer')(app);

//services
require('./services/soapService')(app);
