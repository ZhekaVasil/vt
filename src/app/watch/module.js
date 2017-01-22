/**
 * home page
 */
;(function () {
    'use strict';

    angular.module('vt.watch', ['vt.common']);

    angular
        .module('vt.watch')
        .controller('vtWatchController', WatchController);

    WatchController.$inject = ['$scope', '$routeParams', 'vtVideos'];

    function WatchController ($scope, $routeParams, Videos) {
        document.title = 'VT | Watch';
        $scope.name = 'ZhekaVasil';

        Videos.getVideo($routeParams.unid).then(
            function (response) {
                if (response.status == 200) {
                    $scope.video = response.data.video;
                    $scope.url = 'https://www.youtube.com/embed/' + $scope.video.idv;
                } else {
                    console.log(response.status);
                }
            },
            function (error) {
                console.log(error)
            })
    }

})();