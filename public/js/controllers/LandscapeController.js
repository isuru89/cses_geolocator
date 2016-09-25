function LandscapeController($scope, NgMap, companyService) {
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdU7aA7mrqoL9HHfPqlUaX-zsjlPNqhas"

    $scope.markers = [];

    companyService.browse().then(function (res) {
        var companyData = res.data;
        console.log(companyData);
        for (var i = 0; i < companyData.length; i++) {
            var companyLocation = {};
            companyLocation.title = companyData[i].companyName;
            companyLocation.latitude = companyData[i].latitude;
            companyLocation.longitude = companyData[i].longitude;
            if (companyLocation.latitude !== "" && companyLocation.longitude !== "") {
                $scope.markers.push(companyLocation);
            }
        }
        console.log($scope.markers);
    });

    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });

}