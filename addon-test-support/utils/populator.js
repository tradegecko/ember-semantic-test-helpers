import findControl from './find-control';
import { fillIn, find } from '@ember/test-helpers';

export default async function populate(strategy, label, value) {
  let filler = null;
  let input = await findControl(label);
  //let inputType = await findInputType(input);
  let tagStratergies = {
    input: {
      input: fillIn,
      textarea: fillIn,
    },
    select: {
      select: fillIn,
    },
  };
  if (filler) {
    return filler(input, value);
  } else {
    let tag = input.tagName.toLowerCase();
    let strategyHash = tagStratergies[strategy];
    let strategyCollection = Object.keys(strategyHash)
    let control;
    if (!strategyCollection) {
      throw new Error(`unkown strategy ${strategy}`);
    }
    if (strategyCollection.includes(tag)) {
      control = input;
    } else {
      control = find(`#${input.id} ${strategyCollection.join(', ')}`);
      if(control){
        tag = control.tagName.toLowerCase();
      } else {
        throw new Error(`Cannot find a valid control or aria path for ${label}`)
      }
    }
    if (control) {
      strategyHash[tag](control, value);
    }
  }
}
