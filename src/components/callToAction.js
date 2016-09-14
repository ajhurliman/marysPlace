module.exports = function(app) {

  app.directive('callToAction', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/callToAction.tpl.html'
    };
  });
};