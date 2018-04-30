import findObjects from './find-objects';
import { buttonQuery } from './dom/selectors'

export default function findButtons(labelText) {
  return findObjects(buttonQuery, labelText, 'button');
}
