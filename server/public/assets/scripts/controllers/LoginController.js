/**
 * Created by lukedowell on 9/15/15.
 */
app.controller('LoginController', function($scope, $window) {
    console.log("Controller hit");

    $scope.loginClicked = function() {
        $window.location.href = "/auth/login";
    };
});