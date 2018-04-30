import { findAll } from 'ember-test-selectors';

export default function findByName(selector, text) {
  selector = `${selector} [name="${text}"]`;
  return findAll(selector);
}
