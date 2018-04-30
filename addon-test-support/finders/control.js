import sharedFind from './shared';
import findControls from './controls';

export default function (labelText) {
  return sharedFind(findControls, labelText, 'control');
}
