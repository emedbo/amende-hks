hks.controller('SignupCtrl',['$scope', 'DataService', function ($scope, DataService) {
    $scope.email = '';
    $scope.join = function () {
        DataService.join($scope.email);
    }
}]);