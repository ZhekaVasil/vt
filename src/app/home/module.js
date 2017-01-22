/**
 * home page
 */
;(function () {
    'use strict';

    angular.module('vt.home', ['vt.common']);

    angular
        .module('vt.home')
        .controller('vtHomeController', HomeController);

    HomeController.$inject = ['$log', '$scope', 'vtVideos'];

    function HomeController ($log, $scope, Videos) {
        var log = $log.log;
        document.title = 'VT | Home';
        $scope.name = 'ZhekaVasil';

        $scope.videos = [];

        Videos.getVideos().then(
            function (response) {
                if (response.status == 200) {
                    $scope.videos =  response.data.videos;
                } else {
                    $log.log(response.status);
                }
            },
            function (error) {
                console.log(error)
            });
    }

})();