app.controller("AddProfileController", ['$scope','$http', 'Upload', '$timeout', function($scope,$http, Upload, $timeout) {
    console.log("This is the Add User Controller Working");

    $scope.cleanProfile = {

    };

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
    };

//SUBMIT FORM TO SERVER


    $scope.submit = function() {
        $http.post('/profiles/new').then(function (response) {
            if (response.status !== 200) {
                throw new Error("Failed to pull data from the API");
            }
            console.log(response);
        });
    };


//CLEAR FORM DATA FUNCTION
    var cleanProfile = angular.copy($scope.cleanProfile);

    $scope.resetForm = function ()
    {
        $scope.profile = angular.copy(cleanProfile);
        $scope.addProfileForm.$setPristine();
    };

//PHOTO UPLOAD SECTION

    $scope.uploadFiles = function(file) {
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/profiles/images',
                method: 'POST',
                file: file
            });
            console.log("we've hit the post");

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }



}]);

