;(function () {
    'use strict';

    var app = angular.module('vt', ['ngRoute', 'vt.home', 'vt.watch', 'vt.common', 'vt.services', 'vt.filters']);
/**
 * start angular framework manually
*/

    $(function () {
        angular.bootstrap(document, ['vt']);
    });


})();

