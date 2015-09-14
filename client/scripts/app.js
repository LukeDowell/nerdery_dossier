/**
 * Created by lukedowell on 9/9/15.
 */
var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "/assets/views/routes/home.html",
                controller: "HomeController"
            })
            .when('/addprofile', {
                templateUrl: "/assets/views/routes/addprofile.html",
                controller: "AddProfileController"
            })
            .otherwise({
                redirectTo: '/home'
            })
    });

app.factory('properties', function() {
    var props = {};
    return {
        get: function(key) {
            return props[key];
        },
        set: function(key, value) {
            props[key] = value;
        },
        remove: function(key) {
            delete props[key];
        }
    }
});

app.controller('AddUserC', ['$scope', function($scope) {
    $scope.master = {};

    $scope.update = function(user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
}]);