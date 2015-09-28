//This is the name of our controller for changing the view when user searches for person
app.controller("SearchProfileController",['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.changeRoute = function (/*"name of routeChange parameter on html view"*/){
        $location.path(/*"name of routeChange parameter on html view"*/);

    };


    //this gets the data from the person profile in database

    $scope.submit=function(){
        $http.get('/person').then(function(response){
            if (response.status !== 200) {
                throw new Error("Failed to load a person's info from DB");
            }
        });
    };


    //Add logic for viewing and editing the person object//
    //**************NEED CODE HERE********************************
    $scope.people = [];
    for(var i =0; i<response.data.length; i++) {
        var person = {
            imgurl: response.data[i].imgurl,
            name: response.data[i].name
        };
    }

    $scope.people.push(person);

    //call function
    $scope.submit
}]);