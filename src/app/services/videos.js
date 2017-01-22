/**
 * service for getting videos
 */
;(function () {
   'use strict';
    angular
        .module('vt.services')
        .factory('vtVideos', Videos);

    Videos.$inject = ['$http'];

    function Videos($http) {

        var factory = {
            getVideos: getVideos,
            getVideo: getVideo
        };

        return factory;

        function getVideos() {
            return $http({
                method: 'GET',
                url: '/api/videos'
            });
        };

        function getVideo(unid) {
            return $http({
                method: 'GET',
                url: '/api/video/' + unid
            });
        }
    }
})();