// @ts-check
/* eslint-env node */
/* eslint-disable node/no-extraneous-require */
const pathUtil = require('ember-cli-path-utils');
const stringUtils = require('ember-cli-string-utils');
const useTestFrameworkDetector = require('../test-framework-detector');

/**
 *
 * @param {project} project
 */
function detectLangOption(project) {
  return Object.keys(project.addonPackages).indexOf('ember-cli-typescript') >= 0 ? 'ts' : 'js';
}

module.exports = useTestFrameworkDetector({
  description: 'Installation blueprint for @test-ui/ember',
  normalizeEntityName() {
    return '';
  },
  availableOptions: [
    {
      name: 'test-framework',
      key: 'testFramework',
      type: String,
      required: true,
      default: 'qunit'
    },
    {
      name: 'lang',
      type: String,
      required: true,
      default: 'detect'
    }
  ],
  locals: function(options) {
    let testFolderRoot = stringUtils.dasherize(options.project.name());
    const lang = options.lang === 'detect' ? detectLangOption(this.project) : options.lang;
    if (options.project.isEmberCLIAddon()) {
      testFolderRoot = pathUtil.getRelativeParentPath(
        options.entity.name,
        -1,
        false
      );
    }

    return {
      lang,
      testFolderRoot
    };
  },
  fileMapTokens() {
    const locals = this.locals(this.options);
    return {
      __ext__() {
        return locals.lang;
      }
    }
  },
  /**
   * @param {*} options
   * @this Blueprint
   */
  afterInstall() {
    let dependencies = this.project.dependencies();
    if (('ember-qunit' in dependencies) || ('ember-cli-qunit' in dependencies)) {
      return this.addPackageToProject('@test-ui/qunit');
    } else if (('ember-mocha' in dependencies) || ('ember-cli-mocha' in dependencies)) {
      return this.addPackageToProject('@test-ui/mocha');
    } else {
      this.ui.writeLine("Couldn't determine test style - using QUnit");
      return this.addPackageToProject('@test-ui/qunit');
    }
    // Perform extra work here.
  }
});
