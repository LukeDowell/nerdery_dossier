/**
 * Created by lukedowell on 9/15/15.
 */
loginApp.controller('LoginController', ['$scope', '$window', function($scope, $window) {

    $scope.isLoggingIn = false;

    $scope.loginClicked = function() {
        $scope.isLoggingIn = true;
        $window.location.href = "/auth/login";
    };
}]);