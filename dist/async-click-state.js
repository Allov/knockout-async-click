(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', 'knockout'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('knockout'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.knockout);
        global.asyncClickState = mod.exports;
    }
})(this, function (exports, _jquery, _knockout) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _knockout2 = _interopRequireDefault(_knockout);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var AsyncClickState = function AsyncClickState() {
        var self = this;

        self.asyncTask = _knockout2.default.observable(null);

        self.isBusy = _knockout2.default.pureComputed(function () {
            return !!self.asyncTask();
        });
    };

    // AsyncClick.prototype.xyz = function() {
    //     var self = this;

    // };

    exports.default = new AsyncClickState();
});