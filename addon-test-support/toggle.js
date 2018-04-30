import { click } from '@ember/test-helpers';
import findControl from './finders/control';

export default async function toggle(label) {
  let control = await findControl(label);
  return click(control);
}
