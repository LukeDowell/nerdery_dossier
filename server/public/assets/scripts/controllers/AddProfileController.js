app.controller("AddProfileController", ['$scope','$http', 'FileUploader','$mdDialog', 'PropertiesService', function($scope, $http, FileUploader, $mdDialog, PropertiesService) {
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
        }

            PropertiesService.set('addedProfileStartTime', "");
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
    };

    $scope.addAff = function() {
        $scope.newAffiliation = {};
        console.log($scope.profile.affiliation);
        $scope.profile.affiliation.push($scope.newAffiliation);
    };
    $scope.removeAff = function(index) {
        $scope.profile.affiliation.splice(index,1);
        console.log($scope.profile.affiliation);
    };

    $scope.addEdu = function() {
        $scope.newEducation = {};
        console.log($scope.profile.education);
        $scope.profile.education.push($scope.newEducation);
    };
    $scope.removeEdu = function(index) {
        $scope.profile.education.splice(index,1);
        console.log($scope.profile.education);
    };

    $scope.addRel = function() {
        $scope.newRelationship = {};
        console.log($scope.profile.relationships);
        $scope.profile.relationships.push($scope.newRelationship);
    };
    $scope.removeRel = function(index) {
        $scope.profile.relationships.splice(index,1);
        console.log($scope.profile.relationships);
    };

    $scope.addNews = function() {
        $scope.newNews = {};
        console.log($scope.profile.newsCoverage);
        $scope.profile.newsCoverage.push($scope.newNews);
    };
    $scope.removeNews = function(index) {
        $scope.profile.newsCoverage.splice(index,1);
        console.log($scope.profile.newsCoverage);
    };

    $scope.addWork = function() {
        $scope.newWork = {};
        console.log($scope.profile.workHistory);
        $scope.profile.workHistory.push($scope.newWork);
    };
    $scope.removeWork = function(index) {
        $scope.profile.workHistory.splice(index,1);
        console.log($scope.profile.workHistory);
    };
}]);

