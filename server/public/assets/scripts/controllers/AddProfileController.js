app.controller("AddProfileController", ['$scope','$http', 'FileUploader','$mdDialog', 'PropertiesService', function($scope, $http, FileUploader, $mdDialog, PropertiesService) {

    ////////////////////
    // PROFILE MODELS //
    ////////////////////

    //Empty profile for clearing form
    $scope.cleanProfile = {};

    //Profile Model
    $scope.profile = {
        bio : {
            interests: []
        },
        contact: {
            physicalAddresses: [{street: "", city:"", state:"", zipCode: "", current: true}]
        },
        workHistory: [],
        affiliation: [],
        meeting: [],
        education: [],
        relationships: [],
        newsCoverage: []
    };

    ////////////////////
    // FILE UPLOADING //
    ////////////////////

    $scope.uploader = new FileUploader();
    $scope.uploader.url = "/profiles/image";
    $scope.uploader.onAfterAddingFile = function(item) {
        item.upload();
        item.onSuccess = function(response, status, headers) {
            console.log("Item upload success!");
            console.log(response);
            $scope.profile.bio.imageUrl = response;
        };


        item.onError = function(response, status, headers) {
            console.log("Item upload failed...");
            console.log("Response:" , response);
            console.log("Status: " , status);
            console.log("Headers: " , headers);
        };
    };

    //////////////////////
    /// SUBMIT PROFILE ///
    //////////////////////

    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/profiles/create',
            data: $scope.profile
        }).then(function(response) {
            alert("Person added!");
        });
    };

    //////////////////////
    //// PROFILE DATA ////
    //////////////////////

    //Meeting array functions
    $scope.newMeeting = {};
    $scope.addMeeting = function(meeting) {
        $scope.profile.meeting.push(meeting);
        $scope.newMeeting = {};
    };
    $scope.removeMeeting = function(index) {
        $scope.newMeeting.splice(index, 1);
    };
    $scope.openMeetingDialog = function() {
        $mdDialog.show({
            controller: DateTimeController,
            templateUrl: 'assets/views/template/dateTime.html',
            parent: angular.element(document.body)
        }).then(function(time) {
                if(time) {
                    time.setSeconds(0);
                    time.setMilliseconds(0);
                    $scope.newMeeting.startDate = time;
                }
        },
        function() {
            console.log("Dialog was cancelled");
        });
    };
    if(PropertiesService.get('addedProfileStartTime')) {
        $scope.newMeeting.startDate = PropertiesService.get('addedProfileStartTime');
        PropertiesService.remove('addedProfileStartTime');
    }

    //DATE TIME CONTROLLER
    function DateTimeController($scope, $mdDialog) {
        $scope.submit = function(time) {
            $mdDialog.hide(time);
        };
    }

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