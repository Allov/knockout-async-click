import ko from 'knockout';
import $ from 'jquery';
import asyncClickState from 'async-click-state';


//var handlerId = 0;

//TODO: (?) Suporter scénario comme https://github.com/knockout/knockout/blob/master/src/binding/defaultBindings/event.js
//http://knockoutjs.com/documentation/event-binding.html
ko.bindingHandlers['asyncClick'] = {
    'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var handlerFunction = valueAccessor() || {};
        var $element = $(element);
        //var clickHandlerId = getClickHandlerId();
        var clickHandlerId = 'click';

        ko.applyBindingsToNode(element, {
            safeClick: {}
        });

        $element.on(clickHandlerId, function(event) {
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

                if (asyncClickHtml) {
                    $element.html(asyncClickHtml);
                }

                handlerReturnValue = handlerFunction.apply(viewModel, argsForHandler);
                asyncClickState.asyncTask(handlerReturnValue);

                handlerReturnValue
                .catch(ex => {});
                .then(function() {
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

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $element.off(clickHandlerId);
        });
    }
};

// function getClickHandlerId() {
//     return 'click.ko.clickHandler' + (++handlerId);
// }

function makeArray(arrayLikeObject) {
    var result = [];

    for (var i = 0, j = arrayLikeObject.length; i < j; i++) {
        result.push(arrayLikeObject[i]);
    }

    return result;
}
