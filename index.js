'use strict';
/* eslint-disable-next-line no-unused-vars, node/no-unpublished-require */
const project = require('ember-cli/lib/models/project');
/* eslint-disable-next-line no-unused-vars, node/no-unpublished-require */
const app = require('ember-cli/lib/broccoli/ember-app');

/**
 *
 * @param {project} project
 */
function hasQUnit(project) {
  return Object.keys(project.addonPackages).indexOf('ember-cli-qunit') >= 0;
}

/**
 *
 * @param {project} project
 */
function hasMocha(project) {
  const addonNames = Object.keys(project.addonPackages);
  return (
    addonNames.indexOf('ember-cli-mocha') >= 0 ||
    addonNames.indexOf('ember-mocha') >= 0
  );
}

module.exports = {
  name: '@test-ui/ember',
  /**
   * @param {app} app
   */
  included(app) {
    this._super.call(this, ...arguments);
    const allPkgDependencies = Object.keys(this.project.pkg.dependencies).concat(Object.keys(this.project.pkg.devDependencies));
    // Import penpal
    app.import('node_modules/penpal/lib/index.js', {
      using: [{ transformation: 'cjs', as: 'penpal' }]
    });
    // Import youarei
    app.import('node_modules/youarei/src/youarei.js', {
      using: [{ transformation: 'cjs', as: 'youarei' }]
    });
    if (hasQUnit(app.project)) {
      // QUnit mode
      if (allPkgDependencies.indexOf('@test-ui/qunit') < 0) {
        throw new Error('"@test-ui/qunit" not found. Please re-run `ember g test-ui-ember`');
      }
    } else if (hasMocha(app.project)) {
      // Mocha mode
      if (allPkgDependencies.indexOf('@test-ui/mocha') < 0) {
        throw new Error('"@test-ui/mocha" not found. Please re-run `ember g test-ui-ember`');
      }
      // Patch mocha so that it doesn't auto-run
      //  see: https://github.com/emberjs/ember-mocha/issues/212
      app.import('vendor/mocha-patch.js', {
        type: 'test'
      });
    } else {
      /* eslint-disable-next-line no-console */
      console.warn(
        `[WARNING]: could not identify the testing setup of "${app.name}".
Expected to find 'ember-cli-qunit', 'ember-cli-mocha' or 'ember-mocha' addons`
      );
      // Cannot identify testing setup
    }
  }
};
