/* globals require */
import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { IFrameConnectionServer } from '@test-ui/core';
import { MODE } from 'dummy/tests/utils';
import { Level } from 'bite-log';

const req = require;

setApplication(Application.create(config.APP));

if (MODE === 'qunit') {
  const { QUnitTestServer } = req('@test-ui/qunit');
  const { start } = req('ember-qunit');
  const QUnit = req('qunit').default;

  if (window && window.parent !== window) {
    // Tests are running in an iFrame
    start({ startTests: false });
    // Set the server up
    let srv = new QUnitTestServer(QUnit, {
      connection: new IFrameConnectionServer()
    });

    // Start it
    srv.start();
  } else {
    start();
  }
} else {
  // mocha
  const mocha = req('mocha').mocha;
  if (window && window.parent !== window) {
    const { MochaTestServer } = req('@test-ui/mocha');

    setTimeout(function() {
      const srv = new MochaTestServer(mocha, {
        logLevel: Level.debug,
        connection: new IFrameConnectionServer({
          logLevel: Level.debug
        })
      });
      srv.start();
    }, 400);
  } else {
    mocha.run();
  }
}

