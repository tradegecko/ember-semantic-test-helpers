import { click } from '@ember/test-helpers';
import { findControl } from './finders';

export default async function toggle(label) {
  let control = await findControl(label);
  return click(control);
}
