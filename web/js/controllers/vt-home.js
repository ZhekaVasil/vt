/**
 * home page controller
 */

angular.module('vtApp').controller('vtHomeController', ['$scope', function ($scope) {
    'use strict';
    document.title = 'VT | Home';
    $scope.name = 'Zheka Vasil';
}]);