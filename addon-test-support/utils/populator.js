import findInput from './find-input';
import { fillIn } from '@ember/test-helpers';

export default async function populate(strategy, label, value) {
  let {input, filler} = await findInput(label);
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
      control = $(input).find(strategyCollection.join(', '))[0];
    }
    if (control) {
      strategyHash[tag](control, value);
    }
  }
}
