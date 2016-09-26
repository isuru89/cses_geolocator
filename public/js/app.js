var app = angular.module('geoLocatorApp', ['ui.router', 'CompanyService', 'ngMap'])

app.controller('LandscapeController', LandscapeController)
        .controller('DirectoryController', DirectoryController)
        .controller('CompanyDetailController', CompanyDetailController);

app.config(function ($stateProvider, $urlRouterProvider) {
    var landscapeState = {
        name: 'landscape',
        url: '/landscape/:companyId',
        templateUrl: 'views/landscape.html',
        activetab: 'landscape'
    };

    var directoryState = {
        name: 'directory',
        url: '/directory',
        templateUrl: 'views/directory.html',
        activetab: 'directory'
    };

    $stateProvider.state(landscapeState);
    $stateProvider.state(directoryState);

    $urlRouterProvider.when('', '/landscape/');
});


