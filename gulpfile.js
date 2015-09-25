var gulp = require('gulp');
var uglify = require('gulp-uglify');

var path = {
    assets: "server/public/assets/",
    vendors: "server/public/vendors/"
};

//Place any vendor sources here
var vendorSources = [
    "node_modules/angular/angular.min.js",
    "node_modules/angular/angular.min.js.map",
    "node_modules/angular-animate/angular-animate.min.js",
    "node_modules/angular-animate/angular-animate.min.js.map",
    "node_modules/angular-aria/angular-aria.min.js",
    "node_modules/angular-aria/angular-aria.min.js.map",
    "node_modules/angular-material/angular-material.min.css",
    "node_modules/angular-material/angular-material.min.js",
    "node_modules/angular-route/angular-route.min.js",
    "node_modules/angular-messages/angular-messages.min.js",
    "node_modules/angular-route/angular-route.min.js.map",
    "node_modules/angular-file-upload/dist/angular-file-upload.min.js",
    "node_modules/angular-xeditable-0.1.8/css/xeditable.css",
    "node_modules/angular-xeditable-0.1.8/js/xeditable.min.js",
    "node_modules/ng-dialog/js/ngDialog.min.js",
    "node_modules/ng-dialog/css/ngDialog.min.css",
    "node_modules/ng-dialog/css/ngDialog-custom-width.css",
    "node_modules/ng-dialog/css/ngDialog-theme-default.css"

];

//Place any client side sources here
var assetSources = [
    "client/styles/**/*",
    "client/views/**/*"
];

//Pretty them up then put em to twerk
gulp.task('scripts', function() {
    return gulp.src('client/scripts/**/*')
        //.pipe(uglify())
        .pipe(gulp.dest("server/public/assets/scripts"))
});

//Assets all over the place
gulp.task('assets', function() {
    return gulp.src(assetSources, {base: "client/"})
        .pipe(gulp.dest(path.assets))
});

//Womp womp
gulp.task('vendors', function() {
    return gulp.src(vendorSources, {base: "node_modules/"})
        .pipe(gulp.dest(path.vendors));
});

//The accumulated filth of all their uncommented changes and commits will foam up about their waists
//and the programmers will look up and shout "save us!" ... and I'll whisper, "alright."
gulp.task('watch', function() {
    gulp.watch('client/scripts/**/*', ['scripts']);
    gulp.watch(['client/styles/**/*', 'client/views/**/*'], ['assets']);
});

//The prettiest gulp there ever was
gulp.task('default', ['scripts', 'assets', 'vendors']);