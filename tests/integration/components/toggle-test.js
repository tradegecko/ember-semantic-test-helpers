import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { toggle } from 'ember-semantic-test-helpers/test-support';

module('Integration | Helper | toggle', function(hooks) {
  setupRenderingTest(hooks);

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
