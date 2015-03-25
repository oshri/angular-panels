angular.module('panelsApp')
.factory('$modalStack', ['$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      // var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      // function backdropIndex() {
      //   var topBackdropIndex = -1;
      //   var opened = openedWindows.keys();
      //   for (var i = 0; i < opened.length; i++) {
      //     if (openedWindows.get(opened[i]).value.backdrop) {
      //       topBackdropIndex = i;
      //     }
      //   }
      //   return topBackdropIndex;
      // }

      // $rootScope.$watch(backdropIndex, function(newBackdropIndex){
      //   if (backdropScope) {
      //     backdropScope.index = newBackdropIndex;
      //   }
      // });

      function removeModalWindow(modalInstance) {
        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
          modalWindow.modalScope.$destroy();
          body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
          $document.find('body').eq(0).removeClass('widget-config-mode');
          // checkRemoveBackdrop();
        });
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        $timeout(afterAnimating);

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      // $document.bind('keydown', function (evt) {
      //   var modal;

      //   if (evt.which === 27) {
      //     modal = openedWindows.top();
      //     if (modal && modal.value.keyboard) {
      //       evt.preventDefault();
      //       $rootScope.$apply(function () {
      //         $modalStack.dismiss(modal.key, 'escape key press');
      //       });
      //     }
      //   }
      // });

      $modalStack.open = function (modalInstance, modal) {
        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        // var body = $document.find('body').eq(0);
        // var body = $document.find('#widget-config-form-container');
        var body = $document.find(modalInstance.container);

        var angularDomEl = angular.element('<div></div>');
        angularDomEl.attr({
          'template-url': modal.windowTemplateUrl,
          'window-class': modal.windowClass,
          'index': openedWindows.length() - 1,
          'animate': 'animate'
        }).html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.prepend(modalDomEl);
        $document.find('body').eq(0).addClass('modal-mode');
        // body.addClass(OPENED_MODAL_CLASS);
      };

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }]);