app.controller("AddProfileController", ['$scope', function($scope) {
    console.log("This is the Add User Controller Working");

    $scope.profile = {
        //googleID: String,
        //bio : {
        //    photo: 'https://yt3.ggpht.com/-WyDn0ofyqFs/AAAAAAAAAAI/AAAAAAAAAAA/jJDYIxlkQb4/s150-c-k-no/photo.jpg',
        //    interests: 'waterpolo',
        //    summary: 'Blah blah blah',
        //    demographics: 'what are demographics',
        //    age: 42,
        //    birthday: '10/02',
        //    gender: 'Female'
        //},
        contactInfo: {
            emailAddress: 'nerds@yahoo.com',
            //givenName: 'Nerd Nerdiness',
            //middleNames: 'Waldo',
            //familyName: '',
            fullName: 'Nerd Nerdiness'
            //websites: '[www.nerds.com, www.nerdery.com]'
            //},
            //organizations: [{
            //    title: {type: String},
            //    name: {type: String},
            //    startDate: {type: String},
            //    endDate:  {type: String},
            //    isPrimary: {type: Boolean},
            //    current: {type: Boolean}
            //}],
            //meetings : [{
            //    date : String,
            //    time : String,
            //    notes : String
            //}],
            //medicalSummary: String
        }
    }

//**********************************CLEAR FORM DATA FUNCTION***********************************************
    function AddProfileController($scope) {
        var defaultForm = {
            author: "",
            email: "",
            comment: ""
        };

        $scope.clearForm = function (profile) {
            $scope.addProfileForm.$setPristine();
            $scope.profile = defaultForm;
        };
    }



}]);
//*******************************NEED TO FIGURE OUT THE FORM SUBMISSION STUFF
//
//app.controller('AppCtrl', ['$scope', function($scope){
//    $scope.data = {
//        group1 : 'Banana',
//        group2 : '2'
//    };
//}]);
//
//app.directive('formSubmit', function(){
//    return {
//        require: "form",
//        restrict: 'A',
//        link: function($scope, $el, $attrs){
//            $el.on('submit', function(event){
//                alert('submit handler');
//                event.preventDefault();
//            });
//        }
//    }
//});
//app.directive('mdRadioGroup', function() {
//    return {
//        restrict: 'E',
//        link: function($scope, $el, $attrs) {
//            $el.on('keypress', function(event){
//                if(event.keyCode === 13) {
//                    var form = angular.element(getClosest($el[0], 'form'));
//                    form.triggerHandler('submit');
//                }
//                function getClosest(el, tag) {
//                    tag = tag.toUpperCase();
//                    do {
//                        if (el.nodeName === tag) {
//                            return el;
//                        }
//                    } while (el = el.parentNode);
//                    return null;
//                }
//            })
//        }
//    }
//});