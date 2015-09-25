
app.controller("SettingsController", ['$scope', '$http', 'PropertiesService', function($scope, $http, PropertiesService) {

    var user = PropertiesService.get('user');
    $scope.options = {};
    setOptions();

    //Our status on how the calendar refresh went
    $scope.status = "";

    /**
     * Sets our options and tries to pull a user if none can be found.
     */
    function setOptions() {
        if(user) {
            $scope.options.ignoreEmails = user.emailsToIgnore;
            $scope.options.calendarId = user.managingCalendar;
        } else {
            $http.get('/auth/user')
                .then(
                function(response) {
                    //Success
                    PropertiesService.set('user', response.data);
                    user = PropertiesService.get('user');
                    setOptions();
                },
                function() {
                    //Error
                    console.log("No user can be found. Please log out, then try again.");
                }
            )
        }
    }

    /**
     * Saves our settings
     */
    $scope.saveSettings = function() {
        var user = {};
        //Remove spaces, split using comma as delimiter
        var emailList = $scope.options.ignoreEmails.toString();
        user.emailsToIgnore = emailList.replace(/\s+/g, '').split(',');
        user.managingCalendar = $scope.options.calendarId;

        $http({
            method: "PUT",
            url: '/auth/user',
            data: user
        }).then(
            function(response) {
                //Success
                console.log(response);
                $scope.status = "success";
            },
            function(response) {
                //Error
                console.log(response);
                $scope.status = "failed";
            }
        );
    };
}]);


