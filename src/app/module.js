;(function () {
    'use strict';

    var app = angular.module('vt', ['ngRoute', 'ngCookies', 'vt.home', 'vt.watch', 'vt.common', 'vt.services', 'vt.filters', 'vt.subeditor']);
/**
 * start angular framework manually
*/

    $(function () {
        angular.bootstrap(document, ['vt']);
    });


})();
