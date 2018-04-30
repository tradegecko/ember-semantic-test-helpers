import sharedFind from './shared';
import findButtons from './buttons';

export default function findButton(labelText) {
  return sharedFind(findButtons, labelText, 'button');
}
