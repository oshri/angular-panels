(function(angular){
    'use-strict';

    angular.module('panelsApp').directive('panels', Panels);

    function Panels () {
        var factory = {};

        factory.strict = 'A';
        factory.scope = true;
        factory.link = function (scope, el, attrs){
            var activePanel,
                activePanelType,
                activePanelSize;

            scope.mask = false; 
        
            scope.open = function(panel, type, size, options){
                if (type == 'push') {
                    el.addClass('push-' + panel).addClass(size);
                    activePanel = 'push-' + panel;
                    activePanelType = type;
                    activePanelSize = size;
                    activeMask();
                } else {
                   el.find('.' + panel).addClass('open');
                   activePanel =  panel;
                   activePanelType = type;
                   activePanelSize = size;
                   activeMask();
                }
            };

            scope.addModal = function(){

            };

            scope.close = function(){
                disabledMask();
                closeActivePanel();
            };

            function closeActivePanel () {
                if (activePanelType == 'push') {
                    el.removeClass(activePanel).removeClass(activePanelSize);
                } else {
                    el.find('.' + activePanel).removeClass('open');
                }
                activePanel = undefined;
                activePanelSize = undefined;
                activePanelType = undefined;
            }

            function activeMask (){
                el.find('.panel-mask').addClass('show')
                scope.mask = true;
            }

            function disabledMask () {
                el.find('.panel-mask').removeClass('show')
                scope.mask = false;
            }

        };

        return factory;
    }

    Panels.$inject = [];


})(window.angular);