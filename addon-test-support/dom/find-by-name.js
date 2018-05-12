import { findAll } from '@ember/test-helpers';

export default function findByName(selector, text) {
  let elements = selector.split(',');
  return findAll(elements.join(`[name="${text}"],`));
}
