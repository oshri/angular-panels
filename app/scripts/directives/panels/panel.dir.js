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
            '<div class="panel {{panelName}} {{panelSize}}" ng-transclude></div>'
        ].join('');

        return factory;
    }

    Panel.$inject = [];

})(window.angular);