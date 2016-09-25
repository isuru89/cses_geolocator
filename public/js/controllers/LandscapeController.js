function LandscapeController($scope, NgMap, companyService, $stateParams, $timeout) {
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdU7aA7mrqoL9HHfPqlUaX-zsjlPNqhas"

    $scope.markers = [];

    companyService.browse().then(function (res) {
        var companyData = res.data;
        for (var i = 0; i < companyData.length; i++) {
            var companyLocation = {};

            if (companyData[i].latitude !== "" && companyData[i].longitude !== "") {
                companyLocation.companyId = companyData[i].companyId;
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

    var showDirectedCompany = function () {
        if ($stateParams.companyId) {
            for (var i = 0; i < $scope.markers.length; i++) {
                if ($scope.markers[i].companyId == $stateParams.companyId) {
                    $scope.selectedCompany = $scope.markers[i];
                    $scope.map.showInfoWindow('myInfoWindow', $scope.map.markers[i]);
                    break;
                }
            }
        }
    };


    $timeout(showDirectedCompany, 1000);
}