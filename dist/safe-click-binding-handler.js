'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _asyncClickState = require('async-click-state');

var _asyncClickState2 = _interopRequireDefault(_asyncClickState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_knockout2.default.bindingHandlers.safeClick = {
    'init': function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var originalHref;
        var $element = (0, _jquery2.default)(element);

        if (element.nodeName === 'A') {
            originalHref = element.href;
        }

        var subscription = _asyncClickState2.default.asyncTask.subscribe(function (asyncTask) {
            if (element.nodeName === 'A') {
                if (asyncTask) {
                    element.href = 'javascript: void(0)';
                    $element.addClass('disabled');
                } else {
                    element.href = originalHref;
                    $element.removeClass('disabled');
                }
            } else if (element.nodeName === 'INPUT' || element.nodeName === 'BUTTON') {
                _knockout2.default.bindingHandlers['disable']['update'].call(this, element, function () {
                    return _asyncClickState2.default.asyncTask();
                }, allBindings, viewModel, bindingContext);
            }
        });

        _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
            subscription.dispose();
        });
    }
};