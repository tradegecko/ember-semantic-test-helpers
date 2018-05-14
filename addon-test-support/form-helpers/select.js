import { settled } from '@ember/test-helpers';
import baseFiller from './utils/base-filler';

export default async function fillIn(label, value) {
  try {
    await baseFiller(label, value, 'select');
  } catch (e) {
    throw new Error(`While selecting ${value} for ${label}. ${e.message}`)
  }
  return settled();
}
