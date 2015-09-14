/**
 * Created by lukedowell on 9/9/15.
 */
var app = angular.module('app', ['ngMaterial', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "/assets/views/routes/home.html",
                controller: "HomeController"
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