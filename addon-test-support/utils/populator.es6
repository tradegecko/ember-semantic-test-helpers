import findInput from './find-input';
import { fillIn } from "@ember/test-helpers";

export default async function populate(stratergy, label, value) {
  let {input, inputType} = await findInput(label);
  let tagStratergies = {
    input: [
      'input',
      'textarea',
    ],
    select: [
      'select',
    ],
  };
  if (inputType) {
    let path = `App/test/helpers/forms/${stratergy}-fillers/${inputType}`;
    try {
      let filler = require(path).default;
      return filler(input, value);
    } catch (e) {
      throw e;
    }
  } else {
    let tag = input.tagName.toLowerCase();
    let stratergyCollection = tagStratergies[stratergy];
    let control;
    if (!stratergyCollection) {
      throw new Error(`unkown stratergy ${stratergy}`);
    }
    if (stratergyCollection.includes(tag)) {
      control = input;
    } else {
      control = $(input).find(stratergyCollection.join(', '))[0];
    }
    if (control) {
      return fillIn(control, value);
    }
  }
}
