/**
 * Created by lukedowell on 9/15/15.
 */
loginApp.controller('LoginController', function($scope, $window) {
    console.log("Controller hit");

    $scope.isLoggingIn = false;

    $scope.loginClicked = function() {
        $scope.isLoggingIn = true;
        $window.location.href = "/auth/login";
    };
});