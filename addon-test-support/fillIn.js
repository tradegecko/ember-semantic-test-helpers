import { fillIn as rawFillin } from '@ember/test-helpers';
import findControl from './find-control';

export default async function fillIn(label, value) {
  let control = await findControl(label);
  return rawFillin(control, value)
}
