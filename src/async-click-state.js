define(['jquery', 'knockout'],
    function($, ko) {
        'use strict';

        var AsyncClickState = function() {
            var self = this;

            self.asyncTask = ko.observable(null);
        };

        // AsyncClick.prototype.xyz = function() {
        //     var self = this;

        // };

        return new AsyncClickState();
    });