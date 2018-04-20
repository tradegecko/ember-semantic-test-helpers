import populate from './utils/populator';
import { settled } from '@ember/test-helpers';

export default async function fillIn(label, value) {
  await populate('toggle', label, value);
  return settled();
}
