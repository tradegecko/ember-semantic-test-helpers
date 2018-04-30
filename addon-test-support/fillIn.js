import { fillIn as rawFillin } from '@ember/test-helpers';
import findControl from './finders/control';

export default async function fillIn(label, value) {
  let control = findControl(label);
  return rawFillin(control, value)
}
