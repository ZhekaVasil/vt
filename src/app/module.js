(function () {
    'use strict';

    var app = angular.module('vt', ['ngRoute', 'vt.home', 'vt.watch', 'vt.common']);

    /**
     * start angular framework manually
     */

    $(function () {
        angular.bootstrap(document, ['vt']);
    });


})();

