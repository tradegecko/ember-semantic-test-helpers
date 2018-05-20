import { buttonQuery, textQuery, toggleQuery, selectQuery, formControlQuery} from './definitions/selectors';
import config from './config';
import notify from './notify';

let queryHash = {
  text: textQuery,
  toggle: toggleQuery,
  select: selectQuery,
  form: formControlQuery,
  button: buttonQuery,
}


let _findControl = function (method, labelText, type = 'form'){
  return method(queryHash[type], labelText, type)
}

export function findButton(labelText){
  return findControl(labelText, 'button');
}

export function findButtons(labelText){
  return findControls(labelText, 'button');
}

export function findControl(labelText, type) {
  return _findControl(findObject, labelText, type)
}

export default function findControls(labelText, type) {
  return _findControl(findObjects, labelText, type)
}

export function findObject(selector, labelText, type) {
  let objects = findObjects(selector, labelText, type)
  if(objects.length > 1){
    notify('ambiguousLabel', type, labelText);
  }
  return objects[0];
}

export function findObjects(selector, labelText, type='object', index=0) {
  let finders = config.finders;
  if(finders.length === index) {
    return
  }
  let finder = finders[index]
  let key = finder.key
  let strategy = finder.run

  let objects = strategy(selector, labelText)
  if(!objects || objects.length == 0){
    objects = findObjects(selector, labelText, type, index + 1)
    if(index == finders.length-1){
      return
    }
  } else if (key !== 'ariaNotFound') {
    notify(key, type, labelText, finder.errorText);
  }
  return objects || [];
}
