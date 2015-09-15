/**
 * Created by lukedowell on 9/9/15.
 */
<<<<<<< HEAD
var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages'])
=======
var app = angular.module('app', ['ngMaterial', 'ngRoute'])
>>>>>>> origin/master
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "/assets/views/routes/home.html",
                controller: "HomeController"
            })
<<<<<<< HEAD
<<<<<<< HEAD
            .when('/addprofile', {
                templateUrl: "/assets/views/routes/addnewprofile.html",
                controller: "AddProfileController"
            })
=======
>>>>>>> origin/master
=======
            .when('/view', {
                templateUrl: "/assets/views/routes/viewperson.html",
                controller: "HomeController"
            })
            .when('/search', {
                templateUrl: "/assets/views/routes/searchprofiles.html",
                controller: "HomeController"
            })
>>>>>>> master
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
<<<<<<< HEAD
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
=======
});
>>>>>>> origin/master
