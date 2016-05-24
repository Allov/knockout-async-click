import $ from 'jquery';
import ko from 'knockout';


var AsyncClickState = function() {
    var self = this;

    self.asyncTask = ko.observable(null);

    self.isBusy = ko.pureComputed(function() {
        return !!self.asyncTask();
    });
};

// AsyncClick.prototype.xyz = function() {
//     var self = this;

// };

export default new AsyncClickState();