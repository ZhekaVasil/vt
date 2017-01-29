/**
 * home page
 */
;(function () {
    'use strict';

    angular.module('vt.watch', ['vt.common']);

    angular
        .module('vt.watch')
        .controller('vtWatchController', WatchController);

    WatchController.$inject = ['$scope', '$routeParams', 'video'];

    function WatchController ($scope, $routeParams, video) {
        document.title = 'VT | Watch';
        $scope.name = 'ZhekaVasil';

        load_script();

        $scope.video = video;
        $scope.url = '#/subeditor/' + video.type + '/' + video.idv;
    }

    function load_script() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = 'ytApi';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

})();