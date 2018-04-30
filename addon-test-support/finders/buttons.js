import findObjects from './objects';
import { buttonQuery } from './../dom/selectors'

export default function findButtons(labelText) {
  return findObjects(buttonQuery, labelText, 'button');
}
