/* globals require */

import { visit, currentURL, findAll } from '@ember/test-helpers';
import { MODE } from 'dummy/tests/utils';

const req = require;

if (MODE === 'qunit') {
  const { setupApplicationTest } = req('ember-qunit');
  const { module, test } = req('qunit');

  module('Acceptance | purple', function (hooks) {
    setupApplicationTest(hooks);
    test('visiting /purple', async function(assert) {
      await visit('/purple');
      assert.equal(currentURL(), '/purple');
    });
  });
} else {
  const { expect } = req('chai');
  const { describe, it } = req('mocha');
  const { setupApplicationTest } = req('ember-mocha');

  describe('Acceptance | purple', function() {
    setupApplicationTest();

    it('can visit /purple', async function() {
      await visit('/purple');
      /** @type {HTMLHeadingElement[]} */
      let H1s = /** @type {any[]} */(findAll('h1'));
      expect(H1s.length).to.equal(1);
      expect(H1s[0].innerText).to.equal('Purple');
      expect(currentURL()).to.equal('/purple');
    });
  });
}
