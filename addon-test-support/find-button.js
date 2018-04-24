import sharedFind from './utils/shared-find';

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

export default async function findButton(labelText) {
  return await sharedFind(selector, labelText, 'button');
}
