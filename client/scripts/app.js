/**
 * Created by lukedowell on 9/9/15.
 */

var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages','angularFileUpload','xeditable', 'scDateTime'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "/assets/views/routes/home.html",
                controller: "HomeController"
            })
            .when('/addprofile', {
                templateUrl: "/assets/views/routes/addnewprofile.html",
                controller: "AddProfileController"
            })
            .when('/view', {
                templateUrl: "/assets/views/routes/viewperson.html",
                controller: "ViewPersonController"
            })
            .when('/yoursettings', {
                templateUrl: "/assets/views/routes/yoursettings.html",
                controller: "SettingsController"
            })
            .when('/search', {
                templateUrl: "/assets/views/routes/searchprofiles.html",
                controller: "SearchProfileController"
            })
            .when('/all', {
                templateUrl: "/assets/views/routes/all.html",
                controller: "AllController"
            })
            .otherwise({
                redirectTo: '/home'
            })
    });

app.factory('PropertiesService', function() {

    var props = {
        currentProfile : {
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
                {name: "Rug Collecting Afficianados", title: "Doctor", summary: "In 1988 he did stuff, lots of stuff, charity like."},
                {name: "Bowl for a Cure", title: "Supporter", summary: "Bowling things, all of them."},
                {name: "Little Lebowski Urban Achievers", title: "President", summary: "That rug really tied the room together."}
            ],
            meeting: [{
                date:  "9-22-15",
                time:  "1PM",
                note: "Meet with feeble public access show, and exploit them."
            }],
            education: [{
                institution: "St. Loaf College",
                startDate: "9-2-91",
                endDate: "5-4-95",
                summary: "Fine Arts, Maker of fine White Russians"
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
            medical: "Oh, the usual. I bowl. Drive around. The occasional acid flashback."
        }
    };
    return {
        get: function(key) {
            console.log(" GET props hit, sending " + key);
            return props[key];
        },
        set: function(key, value) {
            props[key] = value;
        },
        remove: function(key) {
            delete props[key];
        }
    };

});
