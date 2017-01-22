;(function () {
    'use strict';

    angular.module('vt').config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl : 'app/home/template.html',
                controller: 'vtHomeController'
            })
            .when('/watch/:unid', {
                templateUrl : 'app/watch/template.html',
                controller: 'vtWatchController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
