angular.module('LoginService', []).factory('loginService', ['$http', function($http) {

    return {

        // login 
        login: function(strategy, data) {
            return $http.post('/api/auth/login/' + strategy, data);
        },

        // logout current user
        logout : function() {
            return $http.post('/api/auth/logout');
        }
    };

}]);