function LandscapeController($scope, NgMap, companyService) {
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdU7aA7mrqoL9HHfPqlUaX-zsjlPNqhas"

    $scope.markers = [];

    companyService.browse().then(function (res) {
        var companyData = res.data;
        for (var i = 0; i < companyData.length; i++) {
            var companyLocation = {};

            if (companyData[i].latitude !== "" && companyData[i].longitude !== "") {
                companyLocation.title = companyData[i].companyName;
                companyLocation.latitude = companyData[i].latitude;
                companyLocation.longitude = companyData[i].longitude;
                companyLocation.address = companyData[i].address;
                companyLocation.email = companyData[i].email;
                companyLocation.website = companyData[i].website;
                $scope.markers.push(companyLocation);
            }
        }
    });

    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });

    $scope.showCompany = function (event, company) {
        $scope.selectedCompany = company;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };

}