/**
 * subeditor page
 */
;(function () {
    'use strict';

    angular.module('vt.subeditor', ['vt.common']);

    angular
        .module('vt.subeditor')
        .controller('vtSubeditorController', SubeditorController);

    SubeditorController.$inject = ['$scope', '$routeParams'];

    function SubeditorController ($scope, $routeParams) {
        document.title = 'VT | Subeditor';
        $scope.unid = $routeParams.unid;

        load_script();

        function load_script() {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.id = 'ytApi';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

    }

})();