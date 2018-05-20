import { customFillers } from '../../config';
import { fillIn, click } from '@ember/test-helpers';
import fillInSelect from './fillin-select';

let defaultFiller = {
  text: fillIn,
  select: fillInSelect,
  toggle: click,
  button: click
}

export default async function(control, value, type) {
  let filledIn
  for(let i = 0; i< customFillers[type].length; i++){
    filledIn = await customFillers[type][i](control, value);
    if(filledIn){
      break;
    }
  }
  if(!filledIn){
    return defaultFiller[type](control, value);
  }
}
