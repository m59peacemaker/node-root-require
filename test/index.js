const test  = require('tape')
const rr = require('../')

test('root_require', t => {
  rr.setRoot(__dirname)
  t.equal(require('~/a'), 123, 'prefix refers to project root')
  t.equal(require('~/a.js'), 123, 'file extension does not break things')

  rr.reset()
  try {
    require('~/a')
    t.fail('did not reset')
  } catch (err) {
    t.pass('prefix is meaningless again after reset()')
  }

  rr.setRoot()
  t.equal(require('~/test/a'), 123, 'setRoot() uses package.json to determine root by default')

  rr.setRoot(__dirname)
  t.equal(require('~/a'), 123, 'setRoot changes the root')

  rr.setPrefix('TATERS')
  t.equal(require('TATERS/a'), 123, 'setPrefix changes the prefix')

  rr.setRoot('#%$^$#%^$').setPrefix('~').reset()
  try {
    require('~/a')
    t.fail('chaining is broken')
  } catch (err) {
    t.pass('functions can be chained')
  }

  rr.reset().setPrefix('@').setRoot(__dirname)
  t.equal(require('@/a'), 123)

  t.end()
})
