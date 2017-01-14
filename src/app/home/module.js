/**
 * home page
 */
(function () {
    'use strict';

    angular.module('vt.home', ['vt.common']);

    angular
        .module('vt.home')
        .controller('vtHomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController ($scope) {
        document.title = 'VT | Home';
        $scope.name = 'ZhekaVasil'
    }

})();