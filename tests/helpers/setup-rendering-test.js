import { setupRenderingTest } from 'ember-qunit';
import enableErrors from './enable-errors';

export default function(hooks, levels){
  setupRenderingTest(hooks);
  enableErrors(hooks, levels);
}
