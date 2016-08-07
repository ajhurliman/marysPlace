
module.exports = function(app) {
  app.directive('storySection', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/storySection.tpl.html',
      controller: 'mainController'
    }
  });
};
