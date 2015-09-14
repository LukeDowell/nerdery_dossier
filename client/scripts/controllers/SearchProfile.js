//This is the name of our controller for changing the view when user searches for person
app.controller("SearchProfileController",['$scope', '$http', '$location', function($scope, $http, $location) {
    console.log("This is the Search Profile Controller Working");

    $scope.changeRoute = function (/*"name of routeChange parameter on html view"*/){
        $location.path(/*"name of routeChange parameter on html view"*/);

    };


    //this gets the data from the person profile in database

    $scope.submit=function(){
        $http.get('/').then(function(response){
            if (response.status !== 200) {
                throw new Error("Failed to load a person's info from DB");
            }
        });
    };


    //Add logic for viewing and editing the person object//
    //**************NEED CODE HERE********************************


    var Person = {



    }


    //call function
    $scope.submit




}]);