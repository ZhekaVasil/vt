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
                controller: 'vtWatchController',
                resolve: {
                    video: ['vtVideos', '$q','$route', function (Videos, $q, $route) {
                        return  $q(function (resolve) {
                            Videos.getVideo($route.current.params.unid).then(
                                function (response) {
                                    if (response.status == 200) {
                                        resolve(response.data.video);
                                    } else {
                                        console.log(response.status);
                                    }
                                },
                                function (error) {
                                    console.log(error)
                                });
                        })

                    } ]
                }
            })
            .when('/subeditor/yt/:unid', {
                templateUrl : 'app/subeditor/template.html',
                controller: 'vtSubeditorController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
