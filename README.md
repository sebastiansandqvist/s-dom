# s-query

## Small DOM utility library

[![NPM version](https://img.shields.io/npm/v/s-query.svg)](https://www.npmjs.com/package/s-query) ![Dependencies](https://img.shields.io/david/sebastiansandqvist/s-query.svg) [![build status](http://img.shields.io/travis/sebastiansandqvist/s-query.svg)](https://travis-ci.org/sebastiansandqvist/s-query) [![NPM license](https://img.shields.io/npm/l/s-query.svg)](https://www.npmjs.com/package/s-query) ![Stability](https://img.shields.io/badge/stability-unstable-orange.svg) [![Test Coverage](https://codeclimate.com/github/sebastiansandqvist/s-query/badges/coverage.svg)](https://codeclimate.com/github/sebastiansandqvist/s-query)

s-query provides a very thin layer of abstraction over native DOM methods to select/traverse/manipulate/inspect HTML elements.

## Installation
```bash
npm install --save s-query
```
*s-query uses CommonJS, so bundle via Browserify/Webpack/etc. before use.*

## Usage
```javascript
var query = require('s-query');

query('#email').hide();
```

### Selector engine
s-query offers two ways to select elements.
1. Using the `byId`, `byClass`, `byTag`, and `byName` methods. They map directly to their native equivalents and are therefore exremely fast. (eg. `query.byId('someID')`)
2. By inserting a CSS-like (or, jQuery-like) selector string into s-query itself. This is more elegant, but relies on querySelectorAll which is not quite as fast as the other methods. (eg. `query('li.nav a')`)

```javascript
query.byClass('foo bar'); // faster -- use this where performance is critical
query('.foo.bar');
```


### Attributes & manipulation
(Strikethrough indicates *coming soon*.)
##### ~~`.addClass() / .removeClass() / .toggleClass()`~~
##### ~~`.after()` / `.before()`~~
##### `.append()` ~~/ `.prepend()`~~
##### ~~`.attr()`~~
##### ~~`.clone()`~~
##### ~~`.css()`~~
##### ~~`.empty()`~~
##### ~~`.remove()`~~
##### ~~`.html()`~~
##### ~~`.is()` / `.checked()` / `.not()`~~
##### ~~`.height()` / `.width()`~~
##### ~~`.id()`~~
##### ~~`.offset()`~~
##### ~~`.position()`~~
##### ~~`.prop()`~~
##### ~~`.scroll()`~~
##### ~~`.show()` / `.hide()`~~
##### ~~`.text()`~~
##### ~~`.val()`~~

### Events
##### ~~`.on(event, callback)`~~
##### ~~`.trigger(event)`~~

### Traversal
##### ~~`.children(selector)` / `.parent()`~~
##### ~~`.closest(selector)`~~
##### ~~`.find(selector)`~~
##### ~~`.next(selector)` / `.prev(selector)`~~
##### ~~`.siblings(selector)`~~

## License (ISC)
Copyright (c) 2015, Sebastian Sandqvist <s.github@sparque.me>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.