
app.controller("SettingsController", ['$scope', 'PropertiesService', function($scope, PropertiesService) {
    var user = PropertiesService.get('user');
    $scope.options = {};
    if(user) {
        $scope.options.ignoreEmails = user.emailsToIgnore;
        $scope.options.calendarId = user.managingCalendar;
    } else {
        console.log(" :[ ")
    }
}]);


