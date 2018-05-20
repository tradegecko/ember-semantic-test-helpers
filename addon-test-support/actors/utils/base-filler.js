import fillinWrapper from './fillin-wrapper';
import { findControl } from '../../finders';

export default async function(label, value, type) {
  let control = findControl(label, type);
  return await fillinWrapper(control, value, type);
}
