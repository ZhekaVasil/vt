/**
 * trustAsResourceUr filter
 */
;(function () {
    'use strict';

    angular.module('vt.filters', [])
        .filter('trustAsResourceUrl', ['$sce', function($sce){
            return function (val) {
                return $sce.trustAsResourceUrl(val);
            }
        }])

})();