/**
 * Created by PR on 9/22/15.
 */
app.controller("AllController", ['$scope', '$http', function($scope, $http){
    console.log("All Controller working! We control all...");
    $scope.allProfiles = [];

    /// time to make the call, for all... profiles, crap.
    $scope.getAllPeeps=function(){
        $http.get('/profiles/get').then(function(response){
            if (response.status !== 200) {
                console.log("error");
                throw new Error("Failed to load a person's info from DB");
            }
            console.log(response.data);
            $scope.allProfiles = response.data;
        });
    };
    $scope.getAllPeeps();

}]);