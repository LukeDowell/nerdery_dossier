/**
 * Created by lukedowell on 9/9/15.
 */
app.controller("HomeController", ['$scope', '$http', '$location', 'PropertiesService', function($scope, $http, $location, PropertiesService) {
    //Pull all the daily events in
    $scope.isLoading = true;

    $scope.events = {};

    $http.get('/events/today')
        .then(function(response) {
            console.log(response);
            $scope.events = response.data;
        }, function(response) {
           //Error
            console.log(response);
        });


    /**
     * Goes to the add new person page with a predefined start time
     * @param startTime
     *  The start time
     */
    $scope.addPerson = function(startTime) {
        console.log("Adding person at time: " + startTime);
    };

    //begin play time with getting a specific profile, setting it to the current profile
    //in the service, and redirecting to the view/edit module

    $scope.editPerson = function(email){
        //console.log("Clicked", email);

        $http({ url: '/profiles/get/' + email,
                method: 'GET',
                data: email,
                headers: {"Content-Type": "application/json;charset=utf-8"}
            }).then(function(res) {
                //console.log($scope.profilies);
                PropertiesService.set('currentProfile', res.data);
                //console.log(PropertiesService.get('currentProfile'));
            }, function(error) {
                console.log(error);
        });
        $location.path("view");
    };

}]);