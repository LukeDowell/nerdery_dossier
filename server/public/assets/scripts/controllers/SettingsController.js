
app.controller("SettingsController", ['$scope', '$http', '$location', function($scope, $http) {
    console.log("This is the Settings  Controller Working");

        $http.get('/auth/success').then(function(response){
            if (response.status !== 200){
                console.log("there was an error");
            }
            $scope.userId = response;
        });
}]);


