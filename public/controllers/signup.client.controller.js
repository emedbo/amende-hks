hks.controller('SignupCtrl',['$scope', 'DataService', function ($scope, DataService) {
    $scope.email = '';
    $scope.submitted = false;
    $scope.isBusy = false;
    $scope.success = false;
    $scope.alreadySignedUp = false;

    $scope.join = function () {
        $scope.submitted = true;
        $scope.isBusy = true;
        $scope.alreadySignedUp = false;
        $scope.success = false;
        DataService.join($scope.email).success(function (data) {
            $scope.isBusy = false;
            $scope.success = true;
        }).error(function (data, status, headers, config) {
            $scope.isBusy = false;
            if(data.reason === "AlreadySignedUp") {
                $scope.alreadySignedUp = true;
                $scope.link = data.link;
            }
        });
    };

    $scope.tryAgain = function () {
        $scope.submitted = false;
        $scope.isBusy = false;
        $scope.success = false;
        $scope.alreadySignedUp = false;
    };

    $scope.validateKnowitEmail = function (joinForm) {
        if(!$scope.email) {
            return;
        }
        joinForm.email.$setValidity('knowit', true);
        if($scope.email.indexOf('@knowit.no') === -1) {
            joinForm.email.$setValidity('knowit', false);
        }
    }
}]);