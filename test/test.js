const test = require('tape')
const electronVersion = require('../')
const cp = require('child_process')
const EE = require('events').EventEmitter

test('returns error if no electron is installed', function (t) {
  mockSpawn()
  electronVersion(function (err, v) {
    t.equal(err.message, 'sorry, nope, nada electrono foundo')
    t.end()
  }).emit('error', new Error('sorry, nope, nada electrono foundo'))
})

test('returns error if no electron is installed', function (t) {
  mockSpawn()
  electronVersion(function (err, v) {
    t.equal(err.message, 'no electron installed')
    t.end()
  }).emit('exit', 127)
})

test('returns error if invalid semver', function (t) {
  mockSpawn(function (stream) {
    process.nextTick(function () {
      stream.end('garbage')
    })
  })
  electronVersion(function (err, v) {
    t.equal(err.message, 'invalid version: garbage')
    t.end()
  })
})

test('returns version if correct semver', function (t) {
  mockSpawn(function (stream) {
    process.nextTick(function () {
      stream.end('v0.33.1')
    })
  })
  electronVersion(function (err, v) {
    t.error(err)
    t.equal(v, 'v0.33.1', 'correct version')
    t.end()
  })
})

function mockSpawn (pipeFn) {
  pipeFn = pipeFn || function () {}
  var spawn = cp.spawn
  cp.spawn = function () {
    cp.spawn = spawn
    var ee = new EE()
    ee.stdout = { pipe: pipeFn }
    return ee
  }
}
