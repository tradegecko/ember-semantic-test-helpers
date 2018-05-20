import fillinWrapper from './fillin-wrapper';
import { findControl } from '../../find-helpers';
import notify from '../../notify';

export default async function(label, value, type) {
  let control = findControl(label, type);
  if(!control) {
    notify('missingObject', type, label);
  }
  return await fillinWrapper(control, value, type);
}
