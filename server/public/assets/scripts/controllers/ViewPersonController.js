//This is the name of our controller for changing the view when user clicks on a person and getting data for person
app.controller("ViewPersonController", ['$scope', '$http', '$location', function($scope, $http, $location){
    console.log("This is the View Person Controller Working");


    $scope.changeRoute = function (/*"name of routeChange parameter on html view"*/) {
        $location.path(/*"name of routeChange parameter on html view"*/);
    };

    //this gets the data from the person profile in database

    $scope.submit=function(){
        $http.get("/").then(function(response) {
            if (response.status !== 200) {
                throw new Error("Failed to load a person's info from DB");
            }
        });
    };


    //Add logic for viewing and editing the person object//
    //**************NEED CODE HERE********************************
    $scope.Person = {
    ///fakeperson start///////////////////////////////////////////
        bio: {
            imageUrl: "http://www.ew.com/sites/default/files/i/imgs/080425/Stoner-Movies/Big-Lebowski-Dude_nl.jpg",
            interests: [{name: "Bowling"},
                        {name: "White Russians"}],
            summary: "Way out west there was this fella... fella I wanna tell ya about. Fella by the name of Jeff Lebowski. At least that was the handle his loving parents gave him, but he never had much use for it himself. Mr. Lebowski, he called himself The Dude. Now, Dude - that's a name no one would self-apply where I come from. But then there was a lot about the Dude that didn't make a whole lot of sense.",
            age: 42,
            birthday: "9-15-73",
            gender: "Male"
        },
        contact: {
            physicalAddress: [{street:"123 Fake St.", city:"Los Angelas", state:"California", zipCode:90016, current:true}],
            socialMedia: {
                twitter: {handle: "@gleemobile", url: "https://twitter.com/gleemobile"},
                linkedIn: {id: "gleemob", url: "https://www.linkedin.com/in/gleemobile"},
                facebook: {id: "Gleemobile", url: "https://www.facebook.com/GleeMobile"},
                instagram: {id: "GMob", url: "https://instagram.com/explore/tags/awkward/"}
            },
            emailAddress: "newbelgium@gmail.com",
            phoneNumber: "950-555-5555",
            fullName:   "Jeffrey The Dude Lebowski",
            website: "www.google.com"
        },
        workHistory: [{
            title:     "Director of Fun",
            name:      "New Belgium Brewery",
            startDate: "9-10-92",
            endDate:   "current",
            current:   true
        },
            {
            title:     "Director of Anything But Fun",
            name:      "Sad Place, McSadsville",
            startDate: "12-4-88",
            endDate:   "9-10-92",
            current:   false
        }],
        affiliation: [
            {name: "Doctor's Without Borders, USA", title: "Doctor", summary: "In 1988 he did stuff, lots of stuff, charity like."},
            {name: "Financial Architects Empires", title: "Architect", summary: "Archetectual things, lots of them."},
            {name: "The National Speleological Society", title: "Spelunker-in-training", summary: "The national caving organization of the USA, with links to all affiliated regions, grottos (clubs), sections, and special interest groups."}
        ],
        meeting: [{
            date:  "9-22-15",
            time:  "1PM",
            note: "Meet with feeble public access show, and exploit them."
        }],
        education: [{
            institution: "St. Olaf College",
            startDate: "9-2-91",
            endDate: "5-4-95",
            summary: "Fine Arts, Bachelor of Fine Arts"
        }],
        relationships: [{
            name: "Bunny Lebowski",
            relationship: "Girlfriend",
            summary: "Uli doesn't care about anything. He's a Nihilist."
        }],
        newsCoverage: [{
            summary: "The Movie", url: "http://www.imdb.com/title/tt0118715/news"},
            {summary: "Not on the rug, man", url: "http://www.arthurbarrydesigns.com"

        }],
        medical: "Sucks"
        ///fakeperson end/////////////////////////////////////////////
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
        $scope.Person.contact.physicalAddress.push({ street: q, city: r, state: s, zipCode: t, isNew: true })
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

    ////start submit function, still needs to be routed, etc., PUT server call, passing in the current/edited Person object
    $scope.submitProfileChanges = function(){
    };
}]);