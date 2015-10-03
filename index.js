const cp = require('child_process')
const once = require('once')
const bl = require('bl')

function electronVersion (cb) {
  cb = once(cb)
  var child = cp.spawn('electron', [ '--version' ])
  child.on('error', cb)
  child.on('exit', function (code) {
    if (code !== 0) return cb(new Error('no electron installed'))
  })
  child.stdout.pipe(bl(function (err, data) {
    if (err) return cb(err)
    cb(null, data.toString().trim())
  }))
  return child
}

module.exports = electronVersion

if (!module.parent) {
  electronVersion(function (err, v) {
    console.log(err, v)
  })
}
