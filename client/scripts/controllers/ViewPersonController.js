//This is the name of our controller for changing the view when user clicks on a person and getting data for person
app.controller("ViewPersonController", ['$scope', '$http', '$location','FileUploader', 'PropertiesService', function($scope, $http, $location, FileUploader, PropertiesService){

    $scope.Person = PropertiesService.get('currentProfile');

    $scope.changeRoute = function (/*"name of routeChange parameter on html view"*/) {
        $location.path(/*"name of routeChange parameter on html view"*/);
    };

    //this gets the data from the person profile in database

    $scope.submit=function(){
        $http.get("/")
            .then(function(response) {
            if (response.status !== 200) {
                throw new Error("Failed to load a person's info from DB");
            }
        });
    };

    //begin functions to allow xeditable functionality on current person object
    $scope.currentEmployer = {};
    $scope.addInterest = function() {
        var a = $scope.interestsForm;
        $scope.Person.bio.interests.push({ name: a, isNew: true })
    };
    $scope.addMeeting = function() {
        var b = $scope.meetDateForm;
        var c = $scope.meetTimeForm;
        var d = $scope.meetNoteForm;
        $scope.Person.meeting.push({ date: b, time: c, note: d, isNew: true })
    };
    $scope.addEducation = function() {
        var e = $scope.institutionForm;
        var f = $scope.startDateForm;
        var g = $scope.endDateForm;
        var h = $scope.summaryForm;
        $scope.Person.education.push({ institution: e, startDate: f, endDate: g, summary: h, isNew: true })
    };
    $scope.addRelationship = function() {
        var i = $scope.nameForm;
        var j = $scope.relationshipForm;
        var k = $scope.summaryForm;
        $scope.Person.relationships.push({ name: i, relationship: j, summary: k, isNew: true })
    };
    $scope.addArticle = function() {
        var l = $scope.articleSummaryForm;
        var m = $scope.articleurlForm;
        $scope.Person.newsCoverage.push({ summary: l, url: m, isNew: true })
    };
    $scope.addAffiliation = function() {
        var n = $scope.affiliationNameForm;
        var o = $scope.affiliationTitleForm;
        var p = $scope.affiliationSummaryForm;
        $scope.Person.affiliation.push({ name: n, title: o, summary: p, isNew: true })
    };
    $scope.addAddress = function() {
        var q = $scope.streetForm;
        var r = $scope.cityForm;
        var s = $scope.stateForm;
        var t = $scope.zipCodeForm;
        $scope.Person.contact.physicalAddresses.push({ street: q, city: r, state: s, zipCode: t, current: false, isNew: true })
    };
    $scope.addEmployer = function() {
        var u = $scope.empTitleForm;
        var v = $scope.empNameForm;
        var w = $scope.empStartDateForm;
        var x = $scope.empEndDateForm;
        $scope.Person.workHistory.push({ title: u, name: v, startDate: w, endDate: x, current: false, isNew: true })
    };

    // start client side data manipulation

    var findCurrentEmployer = function(array){
        for (var i = 0; i < array.length; i++){
            if (array[i].current === true){
                $scope.currentEmployer = array[i];
            }
        }
    };
    findCurrentEmployer($scope.Person.workHistory);

    ////start submit changes function
    $scope.submitProfileChanges = function(){
        console.log("Submit Changes Hit");

        PropertiesService.set('currentProfile', $scope.Person);

        $http({
            url: '/profiles/update',
            method: 'PUT',
            data: $scope.Person
        }).then(function(res) {
            if (res.status = !200) {
                console.log("Error, did not update DB");
            }
            $location.path("view");
        }, function(error) {
            console.log(error);
        });
    };



}]);