import { find } from "@ember/test-helpers";
import findLabel from './find-label';

export default async function (labelText) {
  let element = await findLabel(labelText);
  if (!element) {
    throw Error(`Can't find label ${labelText}`);
  }
  let input = await findControl(labelText, element);
  if (!input) {
    throw Error(`Can't find input for ${labelText}`);
  }
  if (!input.attributes) {
    throw Error(`Can't find input attributes for ${labelText}`);
  }

  return input;
}

function findControl(label, element) {
  if(element.attributes['aria-label'] || element.attributes['aria-labelledby']){
    return element;
  }
  let targetControl = element.attributes['for'];
  if (!targetControl) {
    throw new Error(`${label} does not have a for attribute`);
  }
  let input = element.control || find(`#${element.attributes['for'].value}`);
  if (!input) {
    throw (`could not find input labeled ${label}`);
  }
  return input;
}
