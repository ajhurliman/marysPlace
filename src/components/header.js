
module.exports = function(app) {
  app.directive('header', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/header.tpl.html',
      controller: 'mainController'
    }
  });
};
