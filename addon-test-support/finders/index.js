import sharedFind from './shared';
import findAll from './find-all';
import { buttonQuery, formControlQuery } from './../dom/selectors'

export function findButton(labelText){
  return sharedFind(findButtons, labelText, 'button');
}

export function findButtons(labelText){
  return findObjects(buttonQuery, labelText, 'button');
}

export function findControl(labelText) {
  return sharedFind(findControls, labelText, 'control');
}

export default function findControls(labelText) {
  return findObjects(formControlQuery, labelText, 'control');
}

export function findObjects(selector, labelText) {
  return findAll(selector, labelText)
}
