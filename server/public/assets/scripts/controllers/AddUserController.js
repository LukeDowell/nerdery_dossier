app.controller("AddUserController", ['$scope', function($scope) {
    console.log("This is the Add User Controller Working");

    $scope.master = {};

    $scope.update = function (person) {
        $scope.master = angular.copy(person);
    };

    $scope.reset = function () {
        $scope.person = angular.copy($scope.master);
    };

    $scope.reset();

}]);