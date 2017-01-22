/*global player*/

/**
 * YouTube api
 */
;(function () {
    'use strict';

    angular
        .module('vt.watch')
        .directive('youTube', youTube)
        .controller('youTubeController', youTubeController);

    youTube.$inject = ['$log', '$rootScope', '$window'];
    youTubeController.$inject = ['$scope', '$window','$routeParams', 'vtVideos'];

    function youTube ($log, $rootScope, $window) {

        return {
            restrict: 'E',
            templateUrl : 'app/watch/directives/you-tube.html',
            link : function ($rootScope) {
                $rootScope.$on('$routeChangeStart', function () {
                     try {
                     $('#ytApi').remove();
                     $('#www-widgetapi-script').remove();
                     $window.player = null;
                     $window.YT = null;
                     } catch (e) {
                     console.log('route err');
                     }
                })
            },
            controller : youTubeController
        };
    }

    function youTubeController($scope, $window, $routeParams, Videos) {

        Videos.getVideo($routeParams.unid).then(
            function (response) {
                if (response.status == 200) {
                    load_script();
                    action(response.data.video.idv, $window);
                } else {
                    console.log(response.status);
                }
            },
            function (error) {
                console.log(error)
            });
    }

    function action(id, $window){
        $window.onYouTubeIframeAPIReady = function () {
            $window.player = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: id,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        $window.onPlayerReady = function (event) {

        };

        $window.onPlayerStateChange = function (event) {

        };

        $window.stopVideo = function () {
            player.stopVideo();
        };
    };


    function load_script() {
        var tag = document.createElement('script');
        tag.src = "vendor/yt-iframe-api.js";
        tag.id = 'ytApi';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

})();