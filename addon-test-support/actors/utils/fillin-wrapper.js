import config from '../../config';
import { fillIn, click } from '@ember/test-helpers';
import fillInSelect from './fillin-select';

let defaultFiller = {
  text: fillIn,
  select: fillInSelect,
  toggle: click,
  button: click
}

export default async function(control, value, type) {
  let filledIn = null
  let actors = config.actors;
  for(let i = 0; i< actors[type].length; i++){
    filledIn = await actors[type][i](control, value);
    if(filledIn){
      break;
    }
  }
  if(!filledIn){
    return defaultFiller[type](control, value);
  }
}
