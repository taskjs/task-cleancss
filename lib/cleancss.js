var fs = require('fs');
var path = require('path');
var Execution = require('execution');
var Record = require('record');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        keepBreaks: {
            label: 'Keep Line Breaks',
            default: false,
            type: 'boolean'
        },
        keepSpecialComments: {
            label: 'Keep special comments',
            default: '*',
            type: 'select',
            options: [{value: '*', label: 'keeping all'}, {value:1, label: 'keeping first one only'}, {value: 0, label: 'removing all'}]
        },
        root: {
            label: 'Root path',
            type: 'string',
            placeholder: 'path to resolve absolute @import rules and rebase relative URLs'
        },
        relativeTo: {
            type: 'string',
            lable: 'Relative to path',
            placeholder: 'path with which to resolve relative @import rules and URLs'
        },
        processImport: {
            type: 'boolean',
            default: true,
            label: 'Process @import rules'
        },
        noRebase: {
            type: 'boolean',
            default: false,
            label: 'Skip URLs rebasing'
        },
        noAdvanced: {
            type: 'boolean',
            default: false,
            label: 'Disable advanced optimizations',
            placeholder: 'selector & property merging, reduction, etc.'
        },
        compatibility: {
            type: 'select',
            label: 'Compatibility mode',
            options: [{value: '', label: 'nope'}, 'ie7', 'ie8']
        }
    },
    run: function (inputs, options, logger) {
        return this._run(inputs, options, logger);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        // Select one of options: ['*', 1, 0]
        var ksc = Number(options.keepSpecialComments);
        options.keepSpecialComments = isNaN(ksc)? '*': ksc;

        var CleanCSS = require('clean-css');
        var records = inputs.map(function(record){

            // Image URLs are rebased with the assumption that they are relative to the
            // CSS file they appear in (unless "relativeTo" option is explicitly set by
            // caller)
            if(!options.relativeTo && record.path){
                options.relativeTo = path.resolve(path.dirname(record.path));
            }

            var source = record.contents.toString();
            var minimized = new CleanCSS(options).minify(source);
            return new Record({
                path: record.path,
                contents: minimized
            })
        });

        resolve(records);
    }
})
