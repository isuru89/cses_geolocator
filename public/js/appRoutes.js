angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // list of companies table
        .when('/list', {
            templateUrl: 'views/list.html',
            controller: 'CompanyController'
        });

    $locationProvider.html5Mode(true);

}]);