
module.exports = function(app) {
  app.directive('progressSection', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/progressSection.tpl.html',
      controller: 'mainController'
    }
  });
};
