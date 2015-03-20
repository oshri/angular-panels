(function (angular) {
    'use strict';

    angular.module('sidenavApp')
    .directive('sidenav', function () {
        return {
            strict: 'A',
            priority: 400,
            replace: true,
            controller: 'sidenavCtrl',
            controllerAs: 'sidenavCtrl',
            link: function link (scope, el, attrs) {
                var ctrl = scope.sidenavCtrl;
                ctrl.init();
            },

            template: [
                '<div>',
                    '<div>',
                        '<button ng-click="sidenavCtrl.showLeftPanel()">[L]</button>',
                        '<button ng-click="sidenavCtrl.showRightPanel()">[R]</button>',
                        '<button ng-click="sidenavCtrl.showBottomPanel()">[B]</button>',
                        '<button ng-click="sidenavCtrl.showAllPanels()">[ALL]</button>',
                    '</div>',
                    '<div class="backdrop open" toggle-panel="sidenavCtrl.backdrop" ng-click="sidenavCtrl.hidePanels($event)"></div>',
                    '<div class="panel panel1 content"></div>',
                    '<div class="sidenav sidenav-left open panel panel2" toggle-panel="sidenavCtrl.panels.left.show"></div>',
                    '<div class="sidenav sidenav-right open panel panel3" toggle-panel="sidenavCtrl.panels.right.show"></div>',
                    '<div class="sidenav sidenav-bottom panel panel4" toggle-panel="sidenavCtrl.panels.bottom.show"></div>',
                '</div>'
            ].join(' ')
        }
    });
}(window.angular));