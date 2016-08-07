
module.exports = function(app) {
  app.directive('topDonations', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: './partials/topDonations.tpl.html',
      controller: 'mainController'
    }
  });
};
