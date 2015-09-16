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
            photo: {url:"http://www.ew.com/sites/default/files/i/imgs/080425/Stoner-Movies/Big-Lebowski-Dude_nl.jpg"},
            interests: ["Spelunking", "Steer Wrasslin"],
            summary: "Way out west there was this fella... fella I wanna tell ya about. Fella by the name of Jeff Lebowski. At least that was the handle his loving parents gave him, but he never had much use for it himself. Mr. Lebowski, he called himself The Dude. Now, Dude - that's a name no one would self-apply where I come from. But then there was a lot about the Dude that didn't make a whole lot of sense. And a lot about where he lived, likewise. But then again, maybe that's why I found the place so darned interestin'. They call Los Angeles the City Of Angels. I didn't find it to be that, exactly. But I'll allow there are some nice folks there. 'Course I can't say I've seen London, and I ain't never been to France. And I ain't never seen no queen in her damned undies, so the feller says. But I'll tell you what - after seeing Los Angeles, and this here story I'm about to unfold, well, I guess I seen somethin' every bit as stupefyin' as you'd see in any of them other places. And in English, too. So I can die with a smile on my face, without feelin' like the good Lord gypped me. Now this here story I'm about to unfold took place back in the early '90s - just about the time of our conflict with Sad'm and the I-raqis. I only mention it because sometimes there's a man... I won't say a hero, 'cause, what's a hero? But sometimes, there's a man. And I'm talkin' about the Dude here. Sometimes, there's a man, well, he's the man for his time and place. He fits right in there. And that's the Dude, in Los Angeles. And even if he's a lazy man - and the Dude was most certainly that. Quite possibly the laziest in Los Angeles County, which would place him high in the runnin' for laziest worldwide. But sometimes there's a man, sometimes, there's a man. Aw. I lost my train of thought here. But... aw, hell. I've done introduced him enough.",
            demographics: "White/Caucasian",
            age: 42,
            birthday: "9-15-73",
            gender: "Male"
        },
        contact: {
            physicalAddresses: [{street:"123 Fake St.", city:"Los Angelas", state:"California", zipCode:90016, current:true}],
            socialMedia: {
                twitter: {handle: "@gleemobile", url: "https://twitter.com/gleemobile"},
                linkedIn: {id: "gleemob", url: "https://www.linkedin.com/in/gleemobile"},
                facebook: {id: "Gleemobile", url: "https://www.facebook.com/GleeMobile"},
                instagram: {id: "GMob", url: "https://instagram.com/explore/tags/awkward/"}
            },
            emailAddress: "newbelgium@gmail.com",
            givenName:    "Jeffrey",
            middleNames: ["The Dude"],
            familyName:   "Lebowski",
            fullName:     "Jeffrey 'The Dude' Lebowski",
            websites:    [{name:"New Belgium Brewery", url:"https://www.newbelgium.com/"}]
        },
        organizations: [{
            title:     "Director of Fun",
            name:      "New Belgium Brewery",
            startDate: "9-10-92",
            endDate:   "current",
            isPrimary: true,
            current:   true
        }],
        affiliation: [{
            charity: [{name: "Doctor's Without Borders, USA", title: "Doctor", summary: "Charity Founder, in 1988 he did stuff, lots of stuff, charity like."}],
            NFP: [{name: "Financial Architects Empires", title: "Architect", summary: "Archetectual tHings, lots of them."}],
            group: [{name: "The National Speleological Society", title: "Spelunker-in-training", summary: "The national caving organization of the USA, with links to all affiliated regions, grottos (clubs), sections, and special interest groups."}]
        }],
        meeting: [{
            date:  "9-22-15",
            time:  "1PM",
            notes: "Meet with feeble public access show, and exploit them."
        }],
        education: [{
            institution: "St. Olaf College",
            startDate: "9-2-91",
            endDate: "5-4-95",
            type: "Fine Arts",
            degree: "Bachelor of Fine Arts",
            diplomaReceived: true
        }],
        relationships: [{
            Name: "Bunny Lebowski",
            familyMember: false,
            grandParent: false,
            parent: false,
            spouse: true,
            child: false,
            summary: "Uli doesn't care about anything. He's a Nihilist. "
        }],
        newsCoverage: [{
            personal: {summary: "The Movie", url: "http://www.imdb.com/title/tt0118715/news"},
            company: {summary: "Not on the rug, man", url: "arthurbarrydesigns.com"}
        }],
        medical: {
            summary: "Overall health: 80%",
            complications: "none",
            physicalCharacteristics: "white, overweight, bathrobe"
        }
        ///fakeperson end/////////////////////////////////////////////


    };


    //call function
    $scope.submit


}]);
