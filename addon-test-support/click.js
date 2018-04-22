import { click } from '@ember/test-helpers';
import findButton from './find-button';

export default async function clickByLabel(text) {
  let element = findButton(text);

  if (!element) {
    throw new Error(`Could not find a button containing "${text}"`);
  }

  await click(element);
}
