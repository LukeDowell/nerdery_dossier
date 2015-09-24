app.controller("AddProfileController", ['$scope','$http', 'FileUploader', 'PropertiesService', function($scope, $http, FileUploader, PropertiesService) {
    //Empty profile for clearing form
    $scope.cleanProfile = {};

    //Profile Model
    $scope.profile = {
        bio : {
            imageUrl: '',
            interests: [{name: ""}],
            summary: "",
            demographics: "",
            age: "",
            birthday: "",
            gender: ""
        },
        contact: {
            physicalAddress: [{street: "",city:"", state:"", zipCode: "", current: true}],
            socialMedia: {
                twitter: {handle:"", url: ""},
                linkedIn: {id: "", url: ""},
                facebook: {id:"", url: ""},
                instagram: {id:"", url:""}
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
            current: false
        }],
        affiliation: [
            { name: "", title: "", summary:"" }
        ],
        meeting: {time: ""},
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

    /**
     * ====================
     * == FILE UPLOADING ==
     * ====================
     */
    $scope.uploader = new FileUploader();
    $scope.uploader.url = "/profiles/image";
    $scope.uploader.onAfterAddingFile = function(item) {
        item.onSuccess = function(response, status, headers) {
            console.log("Item upload success!");
            console.log(response);
            $scope.uploadedUrl = response;
        };

        item.onError = function(response, status, headers) {
            console.log("Item upload failed...");
            console.log("Response:" , response);
            console.log("Status: " , status);
            console.log("Headers: " , headers);
        };
        item.upload();
    };

//SUBMIT FORM TO SERVER
    $scope.submit = function() {
        if (PropertiesService.get('addedProfileStartTime').length > 2) {
            $scope.profile.meeting.time = PropertiesService.get('addedProfileStartTime');
        }
        console.log("date/time just before the POST" + $scope.profile.meeting.time);
        $http({
            method: 'POST',
            url: '/profiles/create',
            data: {profile: $scope.profile}
        }).then(function (response) {
            console.log(response);

            //ngDialog.open({template: '<div class="ngdialog-message"> \
                //Your profile has successfully been saved.</div>',
            //        plain: 'true'
            //});

            PropertiesService.set('addedProfileStartTime', "");
            console.log(PropertiesService.get('addedProfileStartTime'));
        });
    };

//CLEAR FORM DATA FUNCTION
    var cleanProfile = angular.copy($scope.cleanProfile);

    $scope.resetForm = function () {
        $scope.profile = angular.copy(cleanProfile);
        $scope.addProfileForm.$setPristine();
    };

//PHOTO UPLOAD SECTION

    $scope.uploadFiles = function(file) {
        file.upload = Upload.upload({
            url: '/profiles/image',
            method: 'POST',
            file: file
        });
        console.log(file.name);
    }
}]);

