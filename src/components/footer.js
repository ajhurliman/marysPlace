
module.exports = function(app) {
  app.directive('footer', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/footer.tpl.html',
      controller: 'mainController'
    }
  });
};
