const cp = require('child_process')
const once = require('once')
const bl = require('bl')
const semver = require('semver')

function electronVersion (electronPath, cb) {
  if (!cb) {
    cb = electronPath
    electronPath = 'electron'
  }

  cb = once(cb)
  var c = cp.spawn(electronPath, [ '--version' ])
  c.on('error', cb)
  c.on('exit', function (code) {
    if (code !== 0) return cb(new Error('no electron installed'))
  })
  c.stdout.pipe(bl(function (err, data) {
    if (err) return cb(err)
    var version = data.toString().trim()
    if (semver.valid(version)) {
      return cb(null, version)
    }
    cb(new Error('invalid version: ' + version))
  }))
  return c
}

module.exports = electronVersion

if (!module.parent) {
  electronVersion(function (err, v) {
    console.log(err, v)
  })
}
