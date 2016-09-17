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
        })

        //shows details of a company
        .when('/details', {
            templateUrl: 'views/details.html',
            controller: 'CompanyDetailsController'
        });        

    $locationProvider.html5Mode(true);

}]);