import { findAll } from "@ember/test-helpers";
import computeAria from './utils/compute-aria';

let inputs = [
  'input',
  'textarea',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="textbox"]',
  '[contenteditable="true"]',
]

let toggles = [
  '[role="checkbox"]',
]

let selectables = [
  'select',
  '[role="listbox"]',
  '[role="radiogroup"]',
]

let controlSelector = [inputs.join(','), toggles.join(','), selectables.join(',')].join(',');

export default async function (labelText) {
  let control = findAll(controlSelector).find( (element) => {
    return computeAria(element) === labelText.toLowerCase()
  });
  if(!control){
    throw new Error(`Could not find control labeled '${labelText}'`)
  }
  return control
}
