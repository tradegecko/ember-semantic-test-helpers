import sharedFind from './utils/shared-find';
import findControls from './find-controls';

export default function (labelText) {
  return sharedFind(findControls, labelText, 'control');
}
