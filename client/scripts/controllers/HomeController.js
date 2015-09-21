/**
 * Created by lukedowell on 9/9/15.
 */
app.controller("HomeController", function($scope, $http) {
    $scope.events = [
        {
            startTime: "12:00",
            attendees: {
                a: {
                    name: "Luke D",
                    email: "lukedowell@gmail.com",
                    imageURL: "http://www.westdean.org.uk/images/profile-placeholder.jpg",
                    id: "1"
                },
                b: {
                    name: "Board Member",
                    email: "lukedowell@gmail.com",
                    imageURL: "http://www.westdean.org.uk/images/profile-placeholder.jpg",
                    id: "2"
                },
                c: {
                    name: "Some Guy (PR)",
                    email: "lukedowell@gmail.com",
                    imageURL: "http://www.westdean.org.uk/images/profile-placeholder.jpg",
                    id: "3"
                }
            }
        },
        {
            startTime: "15:00",
            attendees: {
                a: {
                    name: "Maria S",
                    email: "lukedowell@gmail.com",
                    imageURL: "http://www.westdean.org.uk/images/profile-placeholder.jpg",
                    id: "1"
                },
                b: {
                    name: "Mikel S",
                    email: "lukedowell@gmail.com",
                    imageURL: "http://www.westdean.org.uk/images/profile-placeholder.jpg",
                    id: "2"
                }
            }
        }
    ];

    /**
     * Goes to the add new person page with a predefined start time
     * @param startTime
     *  The start time
     */
    $scope.addPerson = function(startTime) {
        console.log("Adding person at time: " + startTime);
    };

    /**
     * Moves to the edit person view
     * @param person
     *      The person we are going to edit
     */
    $scope.editPerson = function(person) {
        console.log("Editing person: " + person.name);
    };
});