import { findAll } from '@ember/test-helpers';
import computeAria from './utils/compute-aria';

let selector = [
  'button',
  'a',
  '[role="button"]',
  'input[type="reset"]',
  'input[type="button"]',
  'input[type="submit"]',
  '[role="link"]',
  '[role="menuitem"]',
  'input[alt][type="image"]'
].join(',');

export default function findButton(labelText) {
  let button = findAll(selector).find( (element) => {
    return computeAria(element) === labelText.toLowerCase()
  });
  if(!button){
    throw new Error(`Could not find button labeled '${labelText}'`)
  }
  return button
}
