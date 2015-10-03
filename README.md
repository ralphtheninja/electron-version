# electron-version

[![Build Status](https://travis-ci.org/ralphtheninja/electron-version.svg?branch=master)](https://travis-ci.org/ralphtheninja/electron-version)

## Install

```
$ npm i electron-version -S
```

## Usage

Calls back with a version string if `electron` is installed.

```js
const electronVersion = require('electron-version')
electronVersion(function (err, v) {
  console.log(err, v) // null 'v0.33.4'
})
```

## License
All code, unless stated otherwise, is licensed under the [`WTFPL`](http://www.wtfpl.net/txt/copying/) license.
