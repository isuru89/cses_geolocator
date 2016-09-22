function DirectoryController($scope, companyService) {

    companyService.browse().then(function (res) {
        $scope.companies = res.data;
    });

}