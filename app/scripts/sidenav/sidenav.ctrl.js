(function (angular) {
    'use strict';
    angular.module('sidenavApp')
    .controller('sidenavCtrl', ['$scope', function ($scope) {
        var ctrl = this;

        ctrl.panels = {
            left: {
                show: false
            },
            right: {
                show: false
            },
            bottom: {
                show: false
            }
        };
        
        ctrl.backdrop = false;

        ctrl.init = function init() {
            console.log('sidenav controller initialized');
        };

        ctrl.showLeftPanel = function showLeftPanel () {
            ctrl.backdrop = true;
            ctrl.panels.left.show = true;
        };

        ctrl.showRightPanel = function showRightPanel () {
            ctrl.backdrop = true;
            ctrl.panels.right.show = true;
        };

        ctrl.showBottomPanel = function showBottomPanel () {
            ctrl.backdrop = true;
            ctrl.panels.bottom.show = true;
        };

        ctrl.showAllPanels = function showAllPanels () {
            ctrl.backdrop = true;
            ctrl.panels.left.show = true;
            ctrl.panels.right.show = true;
            ctrl.panels.bottom.show = true;
        };

        ctrl.hidePanels = function hidePanels (evt) {
            evt.stopPropagation();
            ctrl.backdrop = false;
            ctrl.panels.left.show = false;
            ctrl.panels.right.show = false;
            ctrl.panels.bottom.show = false;
        };
    }]);
}(window.angular));