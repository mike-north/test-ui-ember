import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/data-collector';
import { Observable, Subscription } from 'micro-observable';
import { AnyTestDataEvent, TestDataEventFor } from '@test-ui/core';
import MutableArray from '@ember/array/mutable';
import { A } from '@ember/array';

export default class DataCollector extends Component {
  observable!: Observable<AnyTestDataEvent>;
  oldSubs?: Subscription;
  messages: MutableArray<string> = A();
  // normal class body definition here
  didReceiveAttrs() {
    this.setupSubscription();
  }
  setupSubscription() {
    if (this.oldSubs) {
      this.oldSubs.unsubscribe();
    }
    this.oldSubs = this.observable.subscribe(evt => {
      switch (evt.event) {
        case 'runStart': {
          this.messages.clear();
        }
        break;
        case 'testStart': {
          const e: TestDataEventFor<'testStart'> = evt;
          this.messages.pushObject('Test: ' + e.data.name);
        }
        break;
        case 'testEnd': {
          const e: TestDataEventFor<'testEnd'> = evt;
          this.messages.pushObject(e.data.status);
        }
        break;
        case 'runEnd': {
          const e: TestDataEventFor<'runEnd'> = evt;
          const { passed, failed, skipped, total } = e.data.testCounts;
          this.messages.addObject(
            `Test run complete. ${passed} passed, ${failed}, failed, ${skipped} skipped out of ${total} tests`
          );
        }
        break;
      }
    });
  }
}

DataCollector.prototype.layout = layout;
