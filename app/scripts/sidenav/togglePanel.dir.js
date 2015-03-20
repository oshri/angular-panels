(function (angular) {
    'use strict';
    var directiveName = 'togglePanel';
    angular.module('sidenavApp')
    .directive(directiveName, ['$animate', function ($animate) {
        return function (scope, el, attrs) {
            scope.$watch(attrs[directiveName], function (newValue) {
                if (newValue) {
                    $animate.addClass(el, 'open');
                }
                else {
                    $animate.removeClass(el, 'open');
                }
            });
        }
    }]);
}(window.angular));