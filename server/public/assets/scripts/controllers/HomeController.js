/**
 * Created by lukedowell on 9/9/15.
 */
app.controller("HomeController", function($scope) {
  var people =[];

    function person(first, last, age, eye) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.eyeColor = eye;
    }

    var person1 = new person("Bob", "Smith", 40, "brown");

    console.log(person1);
});