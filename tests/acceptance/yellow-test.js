/* globals require */

import { visit, currentURL, findAll } from '@ember/test-helpers';
import { MODE } from 'dummy/tests/utils';

const req = require;

if (MODE === 'qunit') {
  const { setupApplicationTest } = req('ember-qunit');
  const { module, test } = req('qunit');

  module('Acceptance | yellow', function (hooks) {
    setupApplicationTest(hooks);
    test('visiting /yellow', async function(assert) {
      await visit('/yellow');
      assert.equal(currentURL(), '/yellow');
    });
  });
} else {
  const { expect } = req('chai');
  const { describe, it } = req('mocha');
  const { setupApplicationTest } = req('ember-mocha');

  describe('Acceptance | yellow', function() {
    setupApplicationTest();

    it('can visit /yellow', async function() {
      await visit('/yellow');
      /** @type {HTMLHeadingElement[]} */
      let H1s = /** @type {any[]} */(findAll('h1'));
      expect(H1s.length).to.equal(1);
      expect(H1s[0].innerText).to.equal('Yellow');
      expect(currentURL()).to.equal('/yellow');
    });
  });
}
