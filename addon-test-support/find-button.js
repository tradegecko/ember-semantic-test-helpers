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
].join(',');

export default function findButton(text) {
  return findAll(selector).find( (element) => {
    return computeAria(element) === text.toLowerCase()
  });
}
