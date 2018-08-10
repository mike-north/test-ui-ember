/* globals require */

import { visit, currentURL, findAll } from '@ember/test-helpers';
import { MODE } from 'dummy/tests/utils';

const req = require;

if (MODE === 'qunit') {
  const { setupApplicationTest } = req('ember-qunit');
  const { module, test } = req('qunit');

  module('Acceptance | orange', function (hooks) {
    setupApplicationTest(hooks);
    test('visiting /orange', async function(assert) {
      await visit('/orange');
      assert.equal(currentURL(), '/orange');
    });
  });
} else {
  const { expect } = req('chai');
  const { describe, it } = req('mocha');
  const { setupApplicationTest } = req('ember-mocha');

  describe('Acceptance | orange', function() {
    setupApplicationTest();

    it('can visit /orange', async function() {
      await visit('/orange');
      /** @type {HTMLHeadingElement[]} */
      let H1s = /** @type {any[]} */(findAll('h1'));
      expect(H1s.length).to.equal(1);
      expect(H1s[0].innerText).to.equal('Orange');
      expect(currentURL()).to.equal('/orange');
    });
  });
}
