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
    }

})();