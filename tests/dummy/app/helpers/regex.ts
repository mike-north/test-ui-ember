import { helper } from '@ember/component/helper';

export function regex([str]: [string]/*, hash*/) {
  return new RegExp(str);
}

export default helper(regex);
