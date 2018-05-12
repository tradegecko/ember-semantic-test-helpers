import { buttonQuery, formControlQuery } from './dom/selectors';
import { strategies } from './config';
import notify from './notify';

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
  } else if(!objects.length) {
    notify('missingObject', type, labelText)
  }
  return objects[0];
}

export function findObjects(selector, labelText, type='object', index=0) {
  let key, strategy;
  if(!key){
    if(strategies.length === index) {
      return
    }
    key = strategies[index][0]
    strategy = strategies[index][1]
  }

  let objects = strategy(selector, labelText)
  if(!objects || objects.length == 0){
    objects = findObjects(selector, labelText, type, index + 1)
    if(index == strategies.length-1){
      return
    }
  } else if (index != 0) {
    notify(key, type, labelText);
  }
  return objects || [];
}
