angular.module('CompanyService', []).factory('companyService', ['$http', function($http) {

    return {

        // get specific company
        read: function(companyId) {
            return $http.get('/api/company/' + companyId);
        },

        // browse all companies
        browse : function() {
            return $http.post('/api/company/all');
        },

        // creates a new company
        create : function(nerdData) {
            return $http.post('/api/company/add', nerdData);
        },

        // call to DELETE a company
        delete : function(id) {
            return $http.post('/api/company/remove/' + id);
        }
    };

}]);