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
      "amount": 95,
      "name": "Francesca Horton"
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
      "name": "Sargent Puckett"
    },
    {
      "amount": 55,
      "name": "Robyn Ray"
    },
    {
      "amount": 850,
      "name": "Flowers Norton"
    },
    {
      "amount": 125,
      "name": "Gentry Rose"
    },
    {
      "amount": 250,
      "name": "Lancaster Tran"
    },
    {
      "amount": 125,
      "name": "Henderson Cochran"
    },
    {
      "amount": 80,
      "name": "Rhea Dunlap"
    },
    {
      "amount": 245,
      "name": "Wall Pennington"
    },
    {
      "amount": 600,
      "name": "Chasity Chen"
    },
    {
      "amount": 175,
      "name": "Foreman Rasmussen"
    },
    {
      "amount": 100,
      "name": "Lucas Pruitt"
    },
    {
      "amount": 145,
      "name": "Lorena Whitfield"
    },
    {
      "amount": 45,
      "name": "Mable Osborne"
    },
    {
      "amount": 25,
      "name": "Lynn Ewing"
    },
    {
      "amount": 20,
      "name": "Britney Kramer"
    },
    {
      "amount": 130,
      "name": "Stacey Marshall"
    },
    {
      "amount": 40,
      "name": "Griffin Casey"
    },
    {
      "amount": 120,
      "name": "Nola Wallace"
    },
    {
      "amount": 25,
      "name": "Kathy Meyer"
    },
    {
      "amount": 2000,
      "name": "Edna Small"
    },
    {
      "amount": 170,
      "name": "Katrina Stokes"
    },
    {
      "amount": 100,
      "name": "Charlene Eaton"
    },
    {
      "amount": 25,
      "name": "Emily Cannon"
    },
    {
      "amount": 135,
      "name": "Franks Summers"
    },
    {
      "amount": 1500,
      "name": "Kelly Mcmillan"
    },
    {
      "amount": 150,
      "name": "Burris Vasquez"
    },
    {
      "amount": 30,
      "name": "Patrica Dillon"
    },
    {
      "amount": 130,
      "name": "Fern Cooley"
    },
    {
      "amount": 40,
      "name": "Clare Beck"
    },
    {
      "amount": 200,
      "name": "Nicholson Carrillo"
    },
    {
      "amount": 175,
      "name": "Adams Parrish"
    },
    {
      "amount": 120,
      "name": "Blankenship Guthrie"
    },
    {
      "amount": 1000,
      "name": "Tucker Moon"
    },
    {
      "amount": 240,
      "name": "Lamb Chapman"
    },
    {
      "amount": 60,
      "name": "Becker Rich"
    },
    {
      "amount": 40,
      "name": "Mccoy Greer"
    },
    {
      "amount": 150,
      "name": "Black Gamble"
    },
    {
      "amount": 115,
      "name": "Rose Hatfield"
    },
    {
      "amount": 20,
      "name": "Colleen Jones"
    },
    {
      "amount": 225,
      "name": "Holden Blankenship"
    },
    {
      "amount": 130,
      "name": "Kate Schneider"
    },
    {
      "amount": 50,
      "name": "Atkins Hoffman"
    },
    {
      "amount": 65,
      "name": "Deborah Moreno"
    },
    {
      "amount": 70,
      "name": "Melba Mullen"
    },
    {
      "amount": 50,
      "name": "Francisca Cruz"
    },
    {
      "amount": 225,
      "name": "Josefina Baker"
    },
    {
      "amount": 500,
      "name": "Juliette Watkins"
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
