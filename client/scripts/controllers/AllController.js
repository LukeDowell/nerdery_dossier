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

        $http({ url: '/profiles/find/' + email,
            method: 'GET',
            data: email,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(res) {
            //console.log($scope.profilies);
            PropertiesService.set('currentProfile', res.data); //setting the currentProfile in service equal to the clicked Profile
            //console.log(PropertiesService.get('currentProfile'));
            $location.path("view"); //Redirecting after data has been updated in ProfilesService
        }, function(error) {
            console.log(error);
        });
    };
}]);