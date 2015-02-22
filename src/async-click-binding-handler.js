define(['knockout', 'jquery', 'async-click-state'], function(ko, $, asyncClickState) {
    'use strict';

    //TODO: (?) Suporter scénario comme https://github.com/knockout/knockout/blob/master/src/binding/defaultBindings/event.js
    //http://knockoutjs.com/documentation/event-binding.html
    ko.bindingHandlers['asyncClick'] = {
        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var handlerFunction = valueAccessor() || {};
            var $element = $(element);

            asyncClickState.asyncTask.subscribe(function() {
                ko.bindingHandlers['disable']['update'].call(this, element,
                    function() {
                        return asyncClickState.asyncTask();
                    }, allBindings, viewModel, bindingContext);
            });

            ko.utils.registerEventHandler(element, 'click', function(event) {
                var handlerReturnValue;
                if (!handlerFunction || asyncClickState.asyncTask())
                    return;

                try {
                    // Take all the event args, and prefix with the viewmodel
                    var argsForHandler = makeArray(arguments);
                    viewModel = bindingContext['$data'];
                    argsForHandler.unshift(viewModel);
                    var originalHtml = $element.html();
                    var asyncClickHtml = allBindings.get('asyncClickHtml');

                    handlerReturnValue = handlerFunction.apply(viewModel, argsForHandler);

                    if (asyncClickHtml) {
                        $element.html(asyncClickHtml);
                    }

                    asyncClickState.asyncTask(handlerReturnValue);
                    
                    handlerReturnValue.always(function() {
                        if (asyncClickHtml) {
                            $element.html(originalHtml);
                        }

                        asyncClickState.asyncTask(null);
                    });
                } finally {
                    //Par convention...
                    event.preventDefault();
                }

                var bubble = allBindings.get('asyncClickBubble') !== false;
                if (!bubble) {
                    event.cancelBubble = true;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                }
            });
        }
    };

    function makeArray(arrayLikeObject) {
        var result = [];

        for (var i = 0, j = arrayLikeObject.length; i < j; i++) {
            result.push(arrayLikeObject[i]);
        }

        return result;
    }
});
