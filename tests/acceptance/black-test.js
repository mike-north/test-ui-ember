/* globals require */

import { visit, currentURL, findAll } from '@ember/test-helpers';
import { MODE } from 'dummy/tests/utils';

const req = require;

if (MODE === 'qunit') {
  const { setupApplicationTest } = req('ember-qunit');
  const { module, test } = req('qunit');

  module('Acceptance | black', function (hooks) {
    setupApplicationTest(hooks);
    test('visiting /black', async function(assert) {
      await visit('/black');
      assert.equal(currentURL(), '/black');
    });
  });
} else {
  const { expect } = req('chai');
  const { describe, it } = req('mocha');
  const { setupApplicationTest } = req('ember-mocha');

  describe('Acceptance | black', function() {
    setupApplicationTest();

    it('can visit /black', async function() {
      await visit('/black');
      /** @type {HTMLHeadingElement[]} */
      let H1s = /** @type {any[]} */(findAll('h1'));
      expect(H1s.length).to.equal(1);
      expect(H1s[0].innerText).to.equal('Black');
      expect(currentURL()).to.equal('/black');
    });
  });
}
