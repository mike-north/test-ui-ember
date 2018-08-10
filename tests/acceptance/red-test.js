/* globals require */

import { visit, currentURL, findAll } from '@ember/test-helpers';
import { MODE } from 'dummy/tests/utils';

const req = require;

if (MODE === 'qunit') {
  const { setupApplicationTest } = req('ember-qunit');
  const { module, test } = req('qunit');

  module('Acceptance | red', function (hooks) {
    setupApplicationTest(hooks);
    test('visiting /red', async function(assert) {
      await visit('/red');
      assert.equal(currentURL(), '/red');
    });
  });
} else {
  const { expect } = req('chai');
  const { describe, it } = req('mocha');
  const { setupApplicationTest } = req('ember-mocha');

  describe('Acceptance | red', function() {
    setupApplicationTest();

    it('can visit /red', async function() {
      await visit('/red');
      /** @type {HTMLHeadingElement[]} */
      let H1s = /** @type {any[]} */(findAll('h1'));
      expect(H1s.length).to.equal(1);
      expect(H1s[0].innerText).to.equal('Red');
      expect(currentURL()).to.equal('/red');
    });
  });
}
