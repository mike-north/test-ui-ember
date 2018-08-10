import Component from '@ember/component';
import { layout, classNames } from '@ember-decorators/component';
import hbs from 'htmlbars-inline-precompile';
import { Client, IFrameConnectionClient } from '@test-ui/core';
import { debounce } from '@ember/runloop';
import { Level } from 'bite-log';

const req = require;

const MOCHA_CLIENT_CONSTRUCTOR = (function(){
  if (!(require as any).has('@test-ui/mocha')) return null;
  return req('@test-ui/mocha')['MochaTestClient'];
}());

const QUNIT_CLIENT_CONSTRUCTOR = (function(){
  if (!(require as any).has('@test-ui/qunit')) return null;
  return req('@test-ui/qunit').QUnitTestClient
}());


function configModuleName(): string {
  return Object.keys((require as any).entries).filter(n => /config\/environment$/m.test(n))[0];
}

function configModule() {
  const n = configModuleName();
  if (!n) throw new Error('could not find module name of this app\'s config/environment.js');
  return req(n);
}

function envName() {
  return configModule().default.environment;
}

function testClientConstructor(mode: 'qunit' | 'mocha' | 'auto' = 'auto'): { new(cfg: Client.Options): Client } {
  if (mode === 'qunit') return QUNIT_CLIENT_CONSTRUCTOR;
  if (mode === 'mocha') return MOCHA_CLIENT_CONSTRUCTOR;
  if (MOCHA_CLIENT_CONSTRUCTOR && QUNIT_CLIENT_CONSTRUCTOR) throw new Error('If both mocha and qunit @test-ui clients exist in the same project, you must specify which one to instantiate');
  else return QUNIT_CLIENT_CONSTRUCTOR || MOCHA_CLIENT_CONSTRUCTOR;
}

@classNames('test-frame')
@layout(hbs`<div class='test-frame__container'></div>`)
export default class TestUiFrame extends Component {
  client!: Client;
  clientReady: boolean = true;
  _filter!: string | RegExp;
  // normal class body definition here
  didInsertElement() {
    super.didInsertElement();
    this.bootTestClient();
  }
  async bootTestClient() {
    /**
     * Terminate if we're using this component IN A TEST, to prevent
     * infinite nesting of iFrames
     */
    if (envName() === 'test') {
      return;
    }
    const frame = this.element.querySelector<HTMLIFrameElement>('.test-frame__container');
    if (!frame) throw new Error('No frame container detected');
    try {
      const C = testClientConstructor();
      if (!C) throw new Error('Could not find appropriate @test-ui client constructor ');
      const enabled = envName() !== 'test';
      this.client = new C({
        logLevel: Level.debug,
        enabled,
        connection: new IFrameConnectionClient({
          logLevel: Level.debug,
          frame,
          baseUrl: '/tests'
        })
      });
      await this.updateTestFrame();
    } catch (e) {
      if (e !== 'Cannot run inside test environment') throw e;
    }
  }
  async updateTestFrame(){
    this.clientReady = false;
    const result = await this.client.runModules({ name: /black/ });
    this.clientReady = true;
    return result;
  }
  get filter() {
    return this._filter;
  }
  set filter(newVal: string | RegExp) {
    this._filter = newVal;
    this.notifyFilterUpdate();
  }
  notifyFilterUpdate() {
    if (this.clientReady) {
      debounce(this, 'updateTestFrame', 1000);
    }
  }
};
