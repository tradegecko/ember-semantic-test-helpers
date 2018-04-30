import { buttonQuery, formControlQuery } from './dom/selectors'
import findByAria from './dom/find-by-aria';
import findByLabel from './dom/find-by-label';
import findByName from './dom/find-by-name';
import notify from './notify'

export function findButton(labelText){
  return findObject(buttonQuery, labelText, 'button');
}

export function findButtons(labelText){
  return findObjects(buttonQuery, labelText, 'button');
}

export function findControl(labelText) {
  return findObject(formControlQuery, labelText, 'control');
}

export default function findControls(labelText) {
  return findObjects(formControlQuery, labelText, 'control');
}

export function findObject(selector, labelText, type) {
  let objects = findObjects(selector, labelText, type)
  if(objects.length > 1){
    notify('ambiguousLabel', type, labelText);
  }
  return objects[0];
}

export function findObjects(selector, labelText, type='object') {
  let objects = findByAria(selector, labelText)
  if(objects.length == 0){
    notify('ariaNotFound', type, labelText);
  }
  return objects;
}
