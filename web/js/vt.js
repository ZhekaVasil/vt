'use strict';

var vtApp = angular.module('vtApp', ['ngRoute']);

/**
 * start angular framework manually
 */

$(function () {
    angular.bootstrap(document, ['vtApp']);
});


/**
 * routing rules
 */
vtApp.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl : 'parts/controllers/vt-home.html',
            controller: 'vtHomeController'
        })
        .when('/watch', {
            templateUrl : 'parts/controllers/vt-watch.html',
            controller: 'vtWatchController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);