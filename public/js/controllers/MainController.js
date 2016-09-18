angular.module('MainCtrl', ['ngMap']).controller('MainController', function ($scope, NgMap) {
    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBdU7aA7mrqoL9HHfPqlUaX-zsjlPNqhas";
    $scope.tagline = 'Show the map here!';
    
    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });

});