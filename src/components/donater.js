module.exports = function(app) {

  app.directive('donater', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/donater.tpl.html'
    };
  });
};