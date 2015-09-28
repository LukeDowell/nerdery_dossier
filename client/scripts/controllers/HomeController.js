/**
 * Created by lukedowell on 9/9/15.
 */
app.controller("HomeController", ['$scope', '$http', '$location', 'PropertiesService', function($scope, $http, $location, PropertiesService) {
    //Pull all the daily events in
    $scope.isLoading = true;

    $scope.events = {};
    if(PropertiesService.get('events')) {
        $scope.events = PropertiesService.get('events');
    }

    $http.get('/events/today')
        .then(function(response) {
            PropertiesService.set('events', response.data);
            $scope.events = PropertiesService.get('events');
        }, function(response) {
           //Error
            console.log("Error retrieving events!");
            console.log(response);
        }
    );

    $http.get('/auth/user')
        .then(
            function(response) {
                PropertiesService.set('user', response.data);
            },
            function(response) {
                console.log("Error setting user profile. Line ~26 HomeController.js");
                console.log(response);
            }
        );


    /**
     * Goes to the add new person page with a predefined start time
     * @param startTime
     *  The start time
     */
    $scope.addPerson = function(startTime) {
        $location.path("addprofile");
        PropertiesService.set('addedProfileStartTime', startTime);
    };

    function findProfileFromEmail(email) {
        var events = PropertiesService.get('events');
        for(var i = 0; i < events.length; i++) {
            var attendeeLength = events[i].attendees.length;
            for(var j = 0; j < attendeeLength; j++) {
                if(email === events[i].attendees[j].profileId.contact.emailAddress) {
                    return events[i].attendees[j].profileId;
                }
            }
        }
    }

    $scope.editPerson = function(email){
        var profile = findProfileFromEmail(email);
        PropertiesService.set('editProfile', profile);
        $location.path('/view');
    };
}]);