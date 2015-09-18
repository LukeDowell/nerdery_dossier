/**
 * Created by lukedowell on 9/14/15.
 */
var app = angular.module('loginApp', ['ngMaterial']);

app.controller('LoginController', function($scope, $window) {
   $scope.loginClicked = function() {
        $window.location.href = '/auth/google';
   };
});