import findByAria from './find-by-aria';
import { formControlQuery } from './selectors'
export default function findByLabel(selector, text) {
  let label = findByAria('label', text);
  if(label.length) {

    label = label[0]
    let id = label.attributes.for.value;
    return  document.querySelectorAll(`#${id} ${formControlQuery}`);
  }
}
