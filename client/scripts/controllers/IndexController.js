//Index controller, controls left navbar --PR 9-14-15
app.controller("IndexController", ['$scope', '$timeout', '$mdSidenav', '$mdUtil', function($scope, $timeout, $mdSidenav, $mdUtil) {
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle();
        },200);
        return debounceFn;
    }
    $scope.close = function () {
        $mdSidenav('left').close();
    };
}]);