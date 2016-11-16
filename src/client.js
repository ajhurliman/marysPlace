'use strict';

var firebase = require('firebase');
var angular = require('angular');
var angularfire = require('angularfire');
require('angular-ui-router');
require('angular-ui-bootstrap');

firebase.initializeApp({
  apiKey: "AIzaSyAw0-pqawx6HR_tCY_Q6RuK17RwbY_A9rA",
  authDomain: "ncso-b01fc.firebaseapp.com",
  databaseURL: "https://ncso-b01fc.firebaseio.com",
  storageBucket: "ncso-b01fc.appspot.com",
  messagingSenderId: "991912784797"
});


var app = angular.module('nochildApp', ['firebase', 'ui.router', 'ui.bootstrap']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
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

}]);


app.controller('mainController', ['$scope', '$http', '$interval', '$firebaseObject', function($scope, $http, $interval, $firebaseObject) {
  document.cookie = 'session-set=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  var ref = firebase.database().ref();
  $scope.firebaseData = $firebaseObject(ref);

  $scope.donaters = [
    // {
    //   id: "sbux",
    //   name: "Starbucks",
    //   amtRaised: '$10,000',
    //   imgUrl: '/assets/sbux.png'
    // },
    // {
    //   id: "amazon",
    //   name: "Amazon",
    //   amtRaised: '$10,000',
    //   imgUrl: '/assets/amazon.jpg'
    // },
    {
      id: "dicks",
      name: "Dick's Drive-In Restaurants",
      amtRaised: '$10,000',
      imgUrl: '/assets/dicks.png'
    },
    {
      id: "boa",
      name: "Bank of America",
      amtRaised: '$25,000',
      imgUrl: '/assets/boa.png'
    },
    {
      id: "vulcan",
      name: "Vulcan",
      amtRaised: '$10,000',
      imgUrl: '/assets/vulcan.png'
    },
    {
      id: "lennar",
      name: "Lennar Multifamily Communities",
      amtRaised: '$5000',
      imgUrl: '/assets/lennar.png'
    },
    {
      id: "hauschka",
      name: "Steve & Lindsey Hauschka",
      amtRaised: '$10,000',
      imgUrl: '/assets/hauschka.png'
    },
    {
      id: "lunchlab",
      name: "Lunchbox Laboratory",
      amtRaised: '$5,000',
      imgUrl: '/assets/lunchlab.png'
    },
    {
      id: "zoots",
      name: "Zoots",
      amtRaised: '$5,000',
      imgUrl: '/assets/zoots.jpg'
    },
    {
      id: "weyerhaeuser",
      name: "Weyerhaeuser",
      amtRaised: '$10,000',
      imgUrl: '/assets/weyer.jpg'
    },
    // {
    //   id: "seachamber",
    //   name: "Seattle Chamber of Commerce",
    //   amtRaised: '$10,000',
    //   imgUrl: '/assets/seachamber.png'
    // },
    {
      id: "restalliance",
      name: "Seattle Restaurant Alliance",
      amtRaised: '$10,000',
      imgUrl: '/assets/restalliance.png'
    },
    {
      id: "biscuit",
      name: "Biscuit Bitch",
      amtRaised: '$5,000',
      imgUrl: '/assets/biscuit.png'
    },
    {
      id: "homest",
      name: "Homestreet Bank",
      amtRaised: '$5,000',
      imgUrl: '/assets/homest.png'
    },
    // {
    //   id: "lairdnorton",
    //   name: "Laird Norton",
    //   amtRaised: '$10,000',
    //   imgUrl: 'http://placehold.it/200x200'
    // },
    {
      id: "womenscouncil",
      name: "Seattle Women's Council",
      amtRaised: '$5,000',
      imgUrl: '/assets/womenscouncil.png'
    },
    {
      id: "nationwide",
      name: "Nationwide",
      amtRaised: '$5,000',
      imgUrl: '/assets/nationwide.png'
    },
    {
      id: "verticalbridge",
      name: "Vertical Bridge",
      amtRaised: '$2,500',
      imgUrl: '/assets/verticalbridge.png'
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
      "amount": 25000,
      "name": "Weyerhaeuser"
    },
    {
      "amount": 10000,
      "name": "Seattle Restaurant Alliance"
    },
    {
      "amount": 10000,
      "name": "Lennar Multifamily Communities"
    },
    {
      "amount": 10000,
      "name": "Steve & Lindsey Hauschka"
    },
    {
      "amount": 13000,
      "name": "Women's Council of Realtors"
    },
    {
      "amount": 10000,
      "name": "HomeStreet Bank"
    },
    {
      "amount": 25000,
      "name": "Bank of America"
    },
    {
      "amount": 10000,
      "name": "Lunchbox Laboratory"
    },
    {
      "amount": 100,
      "name": "Francis Horton"
    },
    {
      "amount": 500,
      "name": "Laura Andrews"
    },
    {
      "amount": 150,
      "name": "Ophelia Olsen"
    },
    {
      "amount": 12,
      "name": "Frank Puckett"
    },
    {
      "amount": 50,
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
    // $scope.totalRaised = 100005; //remove before flight!
    $scope.percentRaised = Math.round($scope.totalRaised/$scope.goal*100);
  });

}]);

app.directive('ticker', ['$interval', '$timeout', function ($interval, $timeout) {
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
}]);



//sections
require('./components/header')(app);
require('./components/donateSection')(app);
require('./components/progressSection')(app);
require('./components/storySection')(app);
require('./components/topDonations')(app);
require('./components/footer')(app);
require('./components/callToAction')(app);
