/**
 * Created by lukedowell on 9/9/15.
 */
app.controller("HomeController", function($scope, $http, properties) {
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

    /**
     * Moves to the edit person view
     * @param person
     *      The person we are going to edit
     */
    $scope.editPerson = function(person) {
        console.log("Editing person: " , person);
        $http({
            url: '/profiles/get',
            method: 'GET',
            params: {emailAddress: person.email}
        }).then(function(response) {
            console.log(response);
        })
    };
});