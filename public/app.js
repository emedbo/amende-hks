var hks = angular.module('hks', ['ngDialog'])

    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);