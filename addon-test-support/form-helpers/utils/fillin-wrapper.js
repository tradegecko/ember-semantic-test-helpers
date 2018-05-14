import { customFillers } from '../../config';
import { fillIn, click } from '@ember/test-helpers';
import fillInSelect from './fillin-select';

let defaultFiller = {
  text: fillIn,
  select: fillInSelect,
  toggle: click,
}

export default async function(control, value, type) {
  let filledIn = customFillers[type].some(function(filler) {
    return filler(control, value);
  });
  if(!filledIn){
    return defaultFiller[type](control, value);
  }
}
