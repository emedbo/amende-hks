var hks = angular.module('hks', ['ngDialog', 'ngMessages', 'ngRoute'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/legselect/:id', {
                templateUrl: 'views/legselect.html',
                controller: 'LegSelectCtrl'
            })
            .when('/legselect', {
                templateUrl: 'views/noLoginId.html'
            })
            .otherwise({
                redirectTo:'/'
            })
    }]);