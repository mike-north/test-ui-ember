/* globals require */

import { visit, currentURL, findAll } from '@ember/test-helpers';
import { MODE } from 'dummy/tests/utils';

const req = require;

if (MODE === 'qunit') {
  const { setupApplicationTest } = req('ember-qunit');
  const { module, test } = req('qunit');

  module('Acceptance | green', function (hooks) {
    setupApplicationTest(hooks);
    test('visiting /green', async function(assert) {
      await visit('/green');
      assert.equal(currentURL(), '/green');
    });
  });
} else {
  const { expect } = req('chai');
  const { describe, it } = req('mocha');
  const { setupApplicationTest } = req('ember-mocha');

  describe('Acceptance | green', function() {
    setupApplicationTest();

    it('can visit /green', async function() {
      await visit('/green');
      /** @type {HTMLHeadingElement[]} */
      let H1s = /** @type {any[]} */(findAll('h1'));
      expect(H1s.length).to.equal(1);
      expect(H1s[0].innerText).to.equal('Green');
      expect(currentURL()).to.equal('/green');
    });
  });
}
