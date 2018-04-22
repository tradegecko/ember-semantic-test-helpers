import { settled } from '@ember/test-helpers';
import findControl from './find-control';
import fillInSelect from './utils/fillin-select';

export default async function fillIn(label, value) {
  let control = await findControl(label);
  await fillInSelect(control, value)
  return settled();
}
