var hks = angular.module('hks', ['ngDialog', 'ngMessages'])

    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);