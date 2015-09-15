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
            .when('/addprofile', {
                templateUrl: "/assets/views/routes/addnewprofile.html",
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
