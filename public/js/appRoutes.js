angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider

                // home page
                .when('/', {
                    templateUrl: 'views/landscape.html'
                })

                // list of companies table
                .when('/directory', {
                    templateUrl: 'views/directory.html'
                })

                //shows details of a company
                .when('/details', {
                    templateUrl: 'views/details.html'
                });

        $locationProvider.html5Mode(true);
        
    }]);