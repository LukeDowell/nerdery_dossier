app.controller("AddProfileController", ['$scope','$http', 'FileUploader','$mdDialog', 'PropertiesService', function($scope, $http, FileUploader, $mdDialog, PropertiesService) {
    //Empty profile for clearing form
    $scope.cleanProfile = {};

    //Profile Model
    $scope.profile = {
        bio : {
            imageUrl: '',
            interests: [],
            summary: "",
            demographics: "",
            age: "",
            birthday: "",
            gender: ""
        },
        contact: {
            physicalAddresses: [{street: "", city:"", state:"", zipCode: "", current: true}],
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
        workHistory: [],
        affiliation: [],
        meeting: {time: ""},
        education: [],
        relationships: [],
        newsCoverage: [],
        medical: "",
        notes: ""

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
    $scope.showAlert = function(ev) {
        if (PropertiesService.get('addedProfileStartTime').length > 2) {
            $scope.profile.meeting.time = PropertiesService.get('addedProfileStartTime');
        }

        if ($scope.profile.contact.emailAddress.length > 4){
            $http({
                method: 'POST',
                url: '/profiles/create',
                data: {profile: $scope.profile}
            }).then(function (response) {

                $scope.status = '  ';

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Your Profile Has Been Successfully Saved!')
                        .content('Your New Profile Has Successfully Been Saved')
                        .ariaLabel('Alert Dialog')
                        .ok('Submit')
                        .targetEvent(ev)
                );
            });
        } else {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Email Address is required!')
                    .content('Email Address is required!')
                    .ariaLabel('Alert Dialog')
                    .ok('Fiiiine...')
                    .targetEvent(ev)
            );
        }

        PropertiesService.set('addedProfileStartTime', "");
    };

//CLEAR FORM DATA FUNCTION
//    var cleanProfile = angular.copy($scope.cleanProfile);
//
//    $scope.resetForm = function () {
//        $scope.profile = angular.copy(cleanProfile);
//        $scope.addProfileForm.$setPristine();
//    };

//PHOTO UPLOAD SECTION

    $scope.uploadFiles = function(file) {
        file.upload = Upload.upload({
            url: '/profiles/image',
            method: 'POST',
            file: file
        });
    };

    //Affiliation Array Functions
    $scope.newAffiliation = {};
    $scope.addAff = function(affs) {
        $scope.profile.affiliation.push(affs);
        $scope.newAffiliation = {};
    };
    $scope.removeAff = function(index) {
        $scope.profile.affiliation.splice(index,1);
    };

    //Education Array Functions
    $scope.newEducation = {};
    $scope.addEdu = function(edus) {
        $scope.profile.education.push(edus);
        $scope.newEducation = {};
    };
    $scope.removeEdu = function(index) {
        $scope.profile.education.splice(index,1);
    };

    //Relation Array Functions
    $scope.newRelationship = {};
    $scope.addRel = function(relates) {
        $scope.profile.relationships.push(relates);
        $scope.newRelationship = {};
    };
    $scope.removeRel = function(index) {
        $scope.profile.relationships.splice(index,1);
    };

    //News Array Functions
    $scope.newNews = {};
    $scope.addNews = function(newsies) {
        $scope.profile.newsCoverage.push(newsies);
        $scope.newNews = {};
    };
    $scope.removeNews = function(index) {
        $scope.profile.newsCoverage.splice(index,1);
    };

    //Work Array Functions
    $scope.newWork = {};
    $scope.addWork = function(work) {
        $scope.profile.workHistory.push(work);
        $scope.newWork = {};
    };
    $scope.removeWork = function(index) {
        $scope.profile.workHistory.splice(index,1);
    };

    //Interests Array Functions
    $scope.newInterest = {};
    $scope.addInt = function(int) {
        $scope.profile.bio.interests.push(int);
        $scope.newInterest = {};
    };
    $scope.removeInt = function(index) {
        $scope.profile.bio.interests.splice(index,1);
    };

}]);