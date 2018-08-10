import { helper } from '@ember/component/helper';
import { registerWaiter } from '@ember/test';

export function wait([n]/*, hash*/) {
  let stillWaiting = true;
  setTimeout(() => {
    stillWaiting = false;
  }, n);
  registerWaiter(() => !stillWaiting);
  return '';
}

export default helper(wait);
