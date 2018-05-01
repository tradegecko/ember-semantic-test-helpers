import hbs from 'htmlbars-inline-precompile';
import setupRenderingTest from './../../helpers/setup-rendering-test';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { toggle } from 'ember-semantic-test-helpers/test-support';

module('Integration | Helper | toggle', function(hooks) {
  setupRenderingTest(hooks, 0);

  test('fills in using label', async function(assert) {
    await render(hbs`
      <label for='control'>Location</label>
      {{input elementId='control' type="checkbox" checked=isChecked}}
    `);
    assert.ok(!this.isChecked)
    await toggle('Location');
    assert.ok(this.isChecked)
  });
})
