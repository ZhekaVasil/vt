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
            restrict: 'A',
            templateUrl : 'app/common/you-tube/you-tube.html',
            scope: {
                unid : '='
            },
            link : link,
            controller : youTubeController
        };
    };

    function link($scope) {
        $scope.$on('$routeChangeStart', function () {
            try {
                $('#ytApi').remove();
                $('#www-widgetapi-script').remove();
                window.player = null;
                window.YT = null;
            } catch (e) {
                console.log('route err');
            }
        })
    };

    function youTubeController($scope, $window) {
        action($scope.unid);

        function makeCanvas(min, sec){
            // var playerDuration = player.getDuration()*1000;
            $scope.elem = $('#canvas');
            $scope.canvas = $scope.elem[0].getContext('2d');
            var x = 0;
            var minutes = min || 0;
            var seconds = sec || 0;
            var length = 20;

            $scope.canvas.strokeStyle = 'blue';
            $scope.canvas.lineWidth = 1;
            $scope.canvas.font = 'bold 12px sans-serif';
            $scope.canvas.textAlign = 'center';

            drawCanvas(x, minutes, seconds, length);
        };

        function startCanvas(){

            $($scope.elem).animate({
                left : '-6000'
            },60000, 'linear', function () {
                console.log('animation complete')
            });

            setTimeout(function () {
                var elem = $('<canvas id="canvas" width="6000"></canvas>');
                var canvas = elem[0].getContext('2d');
                canvas.drawImage($('#canvas')[0], 0,0, 6000,100);
                $('body').append(elem);
                console.log(elem);


            },30000);

           /* var i = 0;
            $scope.elem.css({left: -i +'px'});
            i+=1;
            setInterval(function () {
                if(i==3000){
                    var start = performance.now();
                    $scope.canvas.clearRect(0,0,6000,100);
                    drawCanvas(0, $scope.minutes, $scope.seconds-30, $scope.length);
                    $scope.elem.css({left: '0'});
                    i=0;
                    console.log(performance.now() - start);
                } else {
                    $scope.elem.css({left: -i +'px'});
                }

                i+=1;
            },10);*/
        };

        function drawCanvas(x, minutes, seconds, length){
            var time;
            for(var i=0; i<60000/200; i++){
                $scope.canvas.beginPath();
                $scope.canvas.moveTo(x,0);
                if(i%5==0){
                    $scope.canvas.lineTo(x,10);
                    if(seconds<10){
                        time = minutes +":0" +  seconds;
                    } else {
                        time = minutes +":" +  seconds;
                    }
                    if(seconds>59){
                        minutes++;
                        seconds = 0;
                        time = minutes +":0" +  seconds;
                    }
                    $scope.canvas.fillText(time,x,25);
                    $scope.canvas.stroke();
                    seconds++;
                } else {
                    $scope.canvas.lineTo(x,5);
                    $scope.canvas.stroke();
                }
                x+=length;
            }

            $scope.length = length;
            $scope.x = x;
            $scope.minutes = minutes;
            $scope.seconds = seconds;
        }

        function action(id){
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
                makeCanvas();

            };

            $window.onPlayerStateChange = function (event) {
                if(event.data == 1){
                    startCanvas();
                }
            };

            $window.stopVideo = function () {
                player.stopVideo();
            };
        };
    }



})();