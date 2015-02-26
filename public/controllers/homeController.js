hks.controller('HomeCtrl', ['$scope', 'ngDialog', 'DataService', function ($scope, ngDialog, DataService) {

    DataService.getData().success(function (data) {
        $scope.legs = data;
        $scope.splitLegs = splitLegsForDisplay($scope.legs, 3);
    });
  // $scope.legs = DataService.getData();
    $scope.selectedLeg = {};

    function splitLegsForDisplay(arr, lengthofsublist) {
        if (!angular.isUndefined(arr) && arr.length > 0) {
            var arrayToReturn = [];
            var subArray = [];
            var pushed = true;
            for (var i = 0; i < arr.length; i++) {
                if ((i + 1) % lengthofsublist == 0) {
                    subArray.push(arr[i]);
                    arrayToReturn.push(subArray);
                    subArray = [];
                    pushed = true;
                } else {
                    subArray.push(arr[i]);
                    pushed = false;
                }
            }
            if (!pushed)
                arrayToReturn.push(subArray);

            return arrayToReturn;
        }
    }



    $scope.openLeg = function (leg) {
        $scope.selectedLeg = leg;
        ngDialog.open({
            template: 'views/homeLegModalTemplate.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };

    $scope.signUp = function () {
        ngDialog.open({
            template: 'views/signupModalTemplate.html',
            className: 'ngdialog-theme-plain',
            controller: 'SignupCtrl'
        });
    };

}]);