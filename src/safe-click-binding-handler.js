define([
    'knockout',
    'jquery',
    'async-click-state'
], function(ko, $, asyncClickState) {
    'use strict';

    ko.bindingHandlers.safeClick = {
        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var originalHref;
            var $element = $(element);

            if (element.nodeName === 'A') {
                originalHref = element.href;
            }

            var subscription = asyncClickState.asyncTask.subscribe(function(asyncTask) {
                if (element.nodeName === 'A') {
                    if (asyncTask) {
                        element.href = 'javascript: void(0)';
                        $element.addClass('disabled');
                    } else {
                        element.href = originalHref;
                        $element.removeClass('disabled');
                    }
                } else if (element.nodeName === 'INPUT' || element.nodeName === 'BUTTON') {
                    ko.bindingHandlers['disable']['update'].call(this, element,
                        function() {
                            return asyncClickState.asyncTask();
                        }, allBindings, viewModel, bindingContext);
                }
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                subscription.dispose();
            });
        }
    };

});
