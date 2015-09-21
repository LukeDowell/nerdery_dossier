app.controller("AddProfileController", ['$scope','$http', 'Upload', '$timeout', function($scope,$http, Upload, $timeout) {
    console.log("This is the Add User Controller Working");

    $scope.cleanProfile = {

    };

    $scope.profile = {
        bio : {
            photo: {url:""},
            interests: [{name:" "}],
            summary: "",
            demographics: "",
            age: 42,
            birthday: "",
            gender: ""
        },
        contact: {
            physicalAddress: [{street: "",city:"", state:"", zipCode: 55421, current: true}],
            socialMedia: {
                twitter: {handle:"", url: ""},
                linkinIn: {id: "", url: ""},
                facebook: {id:"", url: ""},
                instagram: {id:"", url:""},
                },
            emailAddress: "",
            phoneNumber: "",
            fullName: "",
            website: ""
        },
        workHistory: [{
            title: "",
            name: "",
            startDate: "",
            endDate:  "",
            current: true
        }],
        affiliation: [
            { name: "", title: "", summary:"" }
        ],
        meetingTimes: [" "],
        education: [{
            institution: "",
            startDate: "",
            endDate:  "",
            summary: ""
        }],
        relationships: [{
            name: "",
            relationship: "",
            summary: ""
        }],
        newsCoverage: [
            { summary: "", url:"" }
        ],
        medical: ""

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
        file.upload = Upload.upload({
            url: 'http://localhost:5000/profiles/image',
            method: 'POST',
            file: file
        });
        $scope.fileName = file.name;
        console.log(file.name);
    }



}]);

