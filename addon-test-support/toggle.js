import { settled,  click } from '@ember/test-helpers';
import findControl from './find-control';

export default async function toggle(label) {
  let control = await findControl(label);
  return click(control);
}
