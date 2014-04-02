# task-cleancss
> Minify CSS files with CleanCSS.

## The "cleancss" task

### Usage Examples

```js
var cleancss = new (require('task-cleancss'))
cleancss.run(inputs, options, logger)
```

### Options

#### options.keepBreaks
Type: `boolean`
Default: `false`

whether to keep line breaks.

#### options.keepSpecialComments
Type: `select`
Default: `'*'`
Options: `['*', 1, 0]`

`'*'` for keeping all, `1` for keeping first one only, `0` for removing all.

#### options.processImport
Type: `boolean`
Default: `true`

whether to process `@import` rules.

#### options.root
Type: `string`

path to resolve absolute `@import` rules and rebase relative URLs

#### options.relativeTo
Type: `string`

path with which to resolve relative `@import` rules and URLs。

#### options.noRebase
Type: `boolean`
Default: `false`

whether to skip URLs rebasing.

#### options.noAdvanced
Type: `boolean`
Default: `false`

set to true to disable advanced optimizations - selector & property merging, reduction, etc..

#### options.noAdvanced
Type: `select`
Default: `null`
Options: `[null, 'ie7', 'ie8']`

Force compatibility mode to `ie7` or `ie8`. Defaults to not set.

## Release History
* 2014-04-03        0.1.0        Initial release.

## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
