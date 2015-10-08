/**
 * Created by PR on 9/22/15.
 */
app.controller("AllController", ['$scope', '$http', '$location', 'PropertiesService', function($scope, $http, $location, PropertiesService) {

    $scope.allProfiles = [];

    /// time to make the call, for all... profiles, crap.
    $scope.getAllPeeps=function(){
        $http.get('/profiles/').then(function(response){
            if (response.status !== 200) {
                console.log("error");
                throw new Error("Failed to load a person's info from DB");
            }
            $scope.allProfiles = response.data;
        });
    };
    $scope.getAllPeeps();

    $scope.editPerson = function(email){
        //console.log("Clicked", email);
        var profile = findProfileFromEmail(email);
        PropertiesService.set('editProfile', profile);
        $location.path('/view');
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
}]);