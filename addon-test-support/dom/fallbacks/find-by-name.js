import { findAll } from '@ember/test-helpers';

export default {
  run: findByName,
  key: 'perceivedByName',
}

function findByName(selector, text) {
  let elements = selector.split(',');
  return findAll(elements.join(`[name="${text}"],`)+`[name="${text}"]`);
}
