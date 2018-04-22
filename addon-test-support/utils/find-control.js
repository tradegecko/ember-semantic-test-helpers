import { findAll } from "@ember/test-helpers";
import computeAria from './compute-aria';

let inputs = [
  'input',
  'textarea',
  'select',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="textbox"]',
  '[contenteditable="true"]',
]

let toggles = [
  '[role="checkbox"]',
]

let selectables = [
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
