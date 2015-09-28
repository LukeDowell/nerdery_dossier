/**
 * Created by lukedowell on 9/9/15.
 */

var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages','angularFileUpload','xeditable', 'scDateTime','ngAria'])
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
            .when('/view', {
                templateUrl: "/assets/views/routes/viewperson.html",
                controller: "ViewPersonController"
            })
            .when('/yoursettings', {
                templateUrl: "/assets/views/routes/yoursettings.html",
                controller: "SettingsController"
            })
            .when('/search', {
                templateUrl: "/assets/views/routes/searchprofiles.html",
                controller: "SearchProfileController"
            })
            .when('/all', {
                templateUrl: "/assets/views/routes/all.html",
                controller: "AllController"
            })
            .otherwise({
                redirectTo: '/home'
            })
    });

app.factory('PropertiesService', function() {

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
    };

});
