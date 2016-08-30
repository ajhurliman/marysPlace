'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
// require('../vendor/js/soapclient');
require('../vendor/js/angular.soap');
// require('../vendor/js/ticker.min');


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

app.controller('mainController', function($scope, $http, soapService, $interval) {
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

  $scope.myTickerItems = [
     {
       title: 'item 1',
       copy: 'amazing copy here'
     },
     {
       title: 'item 2',
       copy: 'wow, this is great'
     },
     {
       title: 'item 3',
       copy: 'hello angular'
     },
     {
       title: 'item 4',
       copy: 'hello angular'
     },
     {
       title: 'item 5',
       copy: 'hello angular'
     },
     {
       title: 'item 6',
       copy: 'hello angular'
     },
     {
       title: 'item 7',
       copy: 'hello angular'
     },
     {
       title: 'item 8',
       copy: 'hello angular'
     }
  ];

  $scope.max = 20;
  $scope.dynamic = 5;

  $scope.storyIsVisible = false;

  $scope.toggleStoryVisibility = function() {
    $scope.storyIsVisible = !$scope.storyIsVisible;
  };

  $http({
    method: 'GET',
    url: '/getTotal'
  }).then(function(res, err) {
    $scope.totalRaised = parseInt(res.data.total);
  });

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

app.directive('ticker', function ($interval, $timeout) {
    return {

        restrict: 'A',
        scope: true,
        compile: function () {

            return function (scope, element, attributes) {

                var timing,
                    timingEffect,
                    timingEffectDivideBy = 4,
                    isHovered = false,
                    innerTime,
                    start;

                if (attributes.timing) {
                    timing = attributes.timing;
                    timingEffect = timing / timingEffectDivideBy;
                } else {
                    timing = 5000;
                    timingEffect = timing / timingEffectDivideBy / timingEffectDivideBy * 2;
                }

                scope.$watch(element, function () {

                    var list = element,
                        items = element.find('li'),
                        itemFirst;


                    if (items.length) {
                        list.addClass('active');

                        start = $interval(function () {

                            /*cancel the callback function for fade-out and makes the ticker steady.*/
                            if (isHovered) {
                                $timeout.cancel(innerTime);
                                return;
                            }

                            items = list.children('li');
                            itemFirst = angular.element(items[0]);

                            itemFirst.addClass('fade-out minus-margin-top');

                            $timeout(function () {
                                itemFirst.removeClass('minus-margin-top');
                                list.append(itemFirst);

                                innerTime = $timeout(function () {
                                    items.removeClass('fade-out');
                                }, timingEffect);

                            }, timingEffect);

                        }, timing);

                    } else {
                        console.warn('no items assigned to ticker! Ensure you have correctly assigned items to your ng-repeat.');
                    }

                });

                element.on('$destroy', function () {
                    $interval.cancel(start, 0);
                });

                /* 
                 *author - mayo
                 *checking for mouse enter the ticker region
                 */
                element.on('mouseenter', function () {
                    isHovered = true;
                });

                /* 
                 *author - mayo
                 *checking for mouse exit the ticker region
                 */
                element.on('mouseleave', function () {
                    isHovered = false;
                });

            };
        }

    };
});



//sections
require('./components/donateSection')(app);
require('./components/progressSection')(app);
require('./components/storySection')(app);
require('./components/topDonations')(app);
require('./components/footer')(app);
