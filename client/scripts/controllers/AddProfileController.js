app.controller("AddProfileController", ['$scope', function($scope) {
    console.log("This is the Add User Controller Working");

    $scope.profile = {
        //googleID: String,
        //bio : {
        //    photo: 'https://yt3.ggpht.com/-WyDn0ofyqFs/AAAAAAAAAAI/AAAAAAAAAAA/jJDYIxlkQb4/s150-c-k-no/photo.jpg',
        //    interests: 'waterpolo',
        //    summary: 'Blah blah blah',
        //    demographics: 'what are demographics',
        //    age: 42,
        //    birthday: '10/02',
        //    gender: 'Female'
        //},
        contactInfo: {
            emailAddress: 'nerds@yahoo.com',
            //givenName: 'Nerd Nerdiness',
            //middleNames: 'Waldo',
            //familyName: '',
            fullName: 'Nerd Nerdiness'
            //websites: '[www.nerds.com, www.nerdery.com]'
            //},
            //organizations: [{
            //    title: {type: String},
            //    name: {type: String},
            //    startDate: {type: String},
            //    endDate:  {type: String},
            //    isPrimary: {type: Boolean},
            //    current: {type: Boolean}
            //}],
            //meetings : [{
            //    date : String,
            //    time : String,
            //    notes : String
            //}],
            //medicalSummary: String
        }
    }

}]);
