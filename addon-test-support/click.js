import { click } from '@ember/test-helpers';
import { findButton } from './finders';

export default async function clickByLabel(text) {

  let element = await findButton(text);
  if (!element) {
    throw new Error(`Could not find a button containing "${text}"`);
  }

  await click(element);
}
