app.controller("AddProfileController", ['$scope', function($scope) {
    console.log("This is the Add User Controller Working");
    //
    //$scope.master = {};
    //
    //$scope.update = function (profile) {
    //    $scope.master = angular.copy(profile);
    //};
    //
    //$scope.reset = function () {
    //    $scope.profile= angular.copy($scope.master);
    //}
    //




//app.controller('DemoCtrl', function($scope) {
    $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '' ,
        company: 'Google' ,
        address: '1600 Amphitheatre Pkwy' ,
        city: 'Mountain View' ,
        state: 'CA' ,
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode : '94043'
    }
//});
   .config( function($mdThemingProvider){

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

    });
    $scope.reset();
}]);
