angular.module('CompanyCtrl', [])
    .controller('CompanyController', ['$scope', 'companyService', function($scope, companyService) {

        companyService.browse().then(function (res) {
            $scope.companies = res.data;
        });
        
    }]);