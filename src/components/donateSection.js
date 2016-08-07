
module.exports = function(app) {
  app.directive('donateSection', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/donateSection.tpl.html',
      controller: 'mainController'
    }
  });
};
