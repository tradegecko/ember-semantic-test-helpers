import { settled } from '@ember/test-helpers';
import { findControl } from './finders';
import fillInSelect from './utils/fillin-select';

export default async function fillIn(label, value) {
  let control = await findControl(label);
  try {
    await fillInSelect(control, value)
  } catch (e) {
    throw new Error(`While selecting ${value} for ${label}. ${e.message}`)
  }
  return settled();
}
