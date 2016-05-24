'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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