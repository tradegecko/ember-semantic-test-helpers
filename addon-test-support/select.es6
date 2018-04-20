import populate from './utils/populator';
import { settled } from '@ember/test-helpers';

export default async function fillIn(label, value) {
  await populate('select', label, value);
  return settled();
}
