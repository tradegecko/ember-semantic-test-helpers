import { findAll } from '@ember/test-helpers';

export default function findByName(selector, text) {
  selector = `${selector} [name="${text}"]`;
  return findAll(selector);
}
