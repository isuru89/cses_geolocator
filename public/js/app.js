angular.module('geoLocatorApp', ['ngRoute', 'appRoutes', 'CompanyService', 'ngMap'])
        .controller('LandscapeController', LandscapeController)
        .controller('DirectoryController', DirectoryController)
        .controller('CompanyDetailController', CompanyDetailController);