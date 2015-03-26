(function(angular){
    'use-strict';

    angular.module('panelsApp').directive('panel', Panel);

    function Panel () {
        var factory = {};

        factory.strict = 'A';
        factory.scope = {
            panelName: '@',
            panelSize: '@',
            panelOptions: '='
        };
        factory.replace = true;
        factory.transclude = true;
        factory.link = function(scope, el, attrs){
            
        };

        factory.template = [
            '<div class="panel {{panelName}} {{panelSize}}">',
                '<div ng-switch="loading">',
                    '<div ng-switch-when="false" class="loading-wrap">',
                        '<div>Preparing data</div>',
                    '</div>',                 
                    '<div ng-switch-default class="panel-content-wrap" ng-transclude>',   
                    '</div>',
                '</div>',
            '</div>'
        ].join('');

        return factory;
    }

    Panel.$inject = [];

})(window.angular);