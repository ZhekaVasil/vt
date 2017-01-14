/**
 * home page
 */
(function () {
    'use strict';

    angular.module('vt.watch', ['vt.common']);

    angular
        .module('vt.watch')
        .controller('vtWatchController', WatchController);

    WatchController.$inject = ['$scope'];

    function WatchController ($scope) {
        document.title = 'VT | Watch';
        $scope.name = 'ZhekaVasil Watch'
    }

})();