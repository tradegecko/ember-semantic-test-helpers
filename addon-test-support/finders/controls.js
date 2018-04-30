import findObjects from './objects';
import { formControlQuery } from './../dom/selectors'

export default function findControls(labelText) {
  return findObjects(formControlQuery, labelText, 'control');
}
