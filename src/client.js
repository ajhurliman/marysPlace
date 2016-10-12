'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');


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


app.controller('mainController', function($scope, $http, $interval) {
  $scope.donaters = [
    {
      name: "Dick's Drive-In Restaurants",
      amtRaised: '$10,000',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Biscuit Bitch",
      amtRaised: '$5,000',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Vulcan",
      amtRaised: '$10,000',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Gravity Payments",
      amtRaised: '$10,000',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Lennar Multifamily Communities",
      amtRaised: '$5000',
      imgUrl: 'http://sheenholders.com/200x200'
    },
    {
      name: "Pemco",
      amtRaised: '$5000',
      imgUrl: 'http://sheenholders.com/200x200'
    }
  ];

  $scope.myTickerItems = [
    {
      "amount": 10000,
      "name": "Dick's Drive-In Restaurants"
    },
    {
      "amount": 5000,
      "name": "Biscuit Bitch"
    },
    {
      "amount": 10000,
      "name": "Vulcan"
    },
    {
      "amount": 10000,
      "name": "Gravity Payments"
    },
    {
      "amount": 5000,
      "name": "Lennar Multifamily Communities"
    },
    {
      "amount": 5000,
      "name": "Pemco"
    },
    {
      "amount": 95,
      "name": "Francis Horton"
    },
    {
      "amount": 185,
      "name": "Laura Andrews"
    },
    {
      "amount":200,
      "name": "Ophelia Olsen"
    },
    {
      "amount": 45,
      "name": "Frank Puckett"
    },
    {
      "amount": 55,
      "name": "Robyn Ray"
    },
    {
      "amount": 850,
      "name": "Patty Norton"
    },
    {
      "amount": 125,
      "name": "Debbie Rose"
    },
    {
      "amount": 250,
      "name": "Jimmy Tran"
    },
    {
      "amount": 125,
      "name": "Andrew Cochran"
    }
  ];

  $scope.goal = 500000;

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
require('./components/header')(app);
require('./components/donateSection')(app);
require('./components/progressSection')(app);
require('./components/storySection')(app);
require('./components/topDonations')(app);
require('./components/footer')(app);
require('./components/callToAction')(app);
