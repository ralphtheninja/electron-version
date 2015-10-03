const test = require('tape')
const electronVersion = require('../')
const cp = require('child_process')
const EE = require('events').EventEmitter

test('returns error if no electron is installed', function (t) {
  t.plan(2)
  var spawn = cp.spawn
  cp.spawn = function (prog, args) {
    cp.spawn = spawn
    var ee = new EE()
    ee.stdout = { pipe: function () {} }
    return ee
  }
  electronVersion(function (err, v) {
    t.equal(err.message, 'sorry, nope, nada electrono foundo')
  }).emit('error', new Error('sorry, nope, nada electrono foundo'))
  electronVersion(function (err, v) {
    t.equal(err.message, 'no electron installed')
  }).emit('exit', 127)
})

test('installed devDependency should give correct version', function (t) {
  electronVersion(function (err, v) {
    t.error(err)
    t.equal(v, 'v0.33.4')
    t.end()
  })
})
