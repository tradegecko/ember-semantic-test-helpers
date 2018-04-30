import sharedFind from './utils/shared-find';
import findButtons from './find-buttons';

export default function findButton(labelText) {
  return sharedFind(findButtons, labelText, 'button');
}
