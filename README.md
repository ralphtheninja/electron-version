# electron-version

> Find the installed `electron` version

![Node version](https://img.shields.io/node/v/electron-version.svg)
[![Build Status](https://travis-ci.org/ralphtheninja/electron-version.svg?branch=master)](https://travis-ci.org/ralphtheninja/electron-version)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

You can optionally specify a custom path to the `electron` binary.

```js
const path = require('path')
const electronVersion = require('electron-version')
const electronPath = path.join(__dirname, 'node_modules/.bin/electron')

electronVersion(electronPath, function (err, v) {
  console.log(err, v) // null 'v1.6.3'
})
```

## License
All code, unless stated otherwise, is licensed under the [`WTFPL`](http://www.wtfpl.net/txt/copying/) license.
