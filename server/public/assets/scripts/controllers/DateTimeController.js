/**
 * Created by lukedowell on 9/27/15.
 */
app.controller('DateTimeController', ['$scope', '$mdDialog', 'scDateTime', function($scope, $mdDialog, scDateTime) {

    $scope.submit = function($value) {
        $mdDialog.hide($value);
    }

}]);