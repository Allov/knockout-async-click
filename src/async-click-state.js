define(['jquery', 'knockout'],
    function($, ko) {
        'use strict';

        var AsyncClickState = function() {
            var self = this;

            self.asyncTask = ko.observable(null);

            self.isBusy = ko.pureComputed(function(){
                return !!self.asyncTask();
            });
        };

        // AsyncClick.prototype.xyz = function() {
        //     var self = this;

        // };

        return new AsyncClickState();
    });