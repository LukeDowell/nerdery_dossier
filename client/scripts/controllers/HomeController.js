/**
 * Created by lukedowell on 9/9/15.
 */
app.controller("HomeController", function($scope, $timeout, $mdSidenav, $mdUtil) {
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
});