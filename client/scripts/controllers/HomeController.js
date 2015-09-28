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
            PropertiesService.set('events', response);
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
        console.log("Adding person at time: " + startTime);
        $location.path("addprofile");
        PropertiesService.set('addedProfileStartTime', startTime);
    };

    function findProfileFromEmail(email) {
        if(PropertiesService.get('events')) {
            var attendees = [];
            var events = PropertiesService.get('events');
            for(var i = 0; i < events.length; i++) {
                var attendeeLength =
            }
        }
    }
    $scope.editPerson = function(email){
        //console.log("Clicked", email);

        $http({ url: '/profiles/find/' + email,
                method: 'GET',
                data: email
            }).then(function(res) {
                //console.log($scope.profilies);
                PropertiesService.set('currentProfile', res.data);  //setting the currentProfile in service equal to the clicked Profile
                //console.log(PropertiesService.get('currentProfile'));
                $location.path("view");  //Redirecting after data has been updated in ProfilesService
            }, function(error) {
                console.log(error);
        });
    };
}]);