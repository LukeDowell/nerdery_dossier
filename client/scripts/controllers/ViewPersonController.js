//This is the name of our controller for changing the view when user clicks on a person and getting data for person
app.controller("ViewPersonController", ['$scope', '$http', '$location', function($scope, $http, $location){
    console.log("This is the View Person Controller Working");


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


    //begin functions to apply altered data to current person object
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
        var h = $scope.typeForm;
        var i = $scope.degreeForm;
        $scope.Person.education.push({ institution: e, startDate: f, endDate: g, type: h, degree: i, isNew: true })
    };
    $scope.addRelationship = function() {
        var j = $scope.nameForm;
        var k = $scope.relationshipForm;
        var l = $scope.summaryForm;
        $scope.Person.relationships.push({ name: j, relationship: k, summary: l, isNew: true })
    };
    $scope.addArticle = function() {
        var m = $scope.articleTypeForm;
        var n = $scope.articleSummaryForm;
        var o = $scope.articleurlForm;
        $scope.Person.newsCoverage.push({ type: m, summary: n, url: o, isNew: true })
    };
    $scope.addAffiliation = function() {
        var p = $scope.affiliationTypeForm;
        var q = $scope.affiliationNameForm;
        var r = $scope.affiliationTitleForm;
        var s = $scope.affiliationSummaryForm;
        $scope.Person.affiliation.push({ type: p, name: q, title: r, summary: s, isNew: true })
    };
    $scope.addAddress = function() {
        var t = $scope.streetForm;
        var u = $scope.cityForm;
        var v = $scope.stateForm;
        var w = $scope.zipCodeForm;
        $scope.Person.contact.physicalAddresses.push({ street: t, city: u, state: v, zipCode: w, isNew: true })
    };
    $scope.addEmployer = function() {
        var x = $scope.empTitleForm;
        var y = $scope.empNameForm;
        var z = $scope.empStartDateForm;
        var aa = $scope.empEndDateForm;
        var bb = $scope.empWebsiteForm;
        $scope.Person.organizations.push({ title: x, name: y, startDate: z, endDate: aa, website: bb, isPrimary: false, current: false, isNew: true })
    };
    $scope.submit;
    var findCurrentEmployer = function(array){
        for (var i = 0; i < array.length; i++){
            if (array[i].current === true){
                $scope.currentEmployer = array[i];
            }
        }
    };
    findCurrentEmployer($scope.Person.organizations);
}]);