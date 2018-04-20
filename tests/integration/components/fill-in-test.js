import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';

module('Integration | Helper | fillIn', function(hooks) {
  setupRenderingTest(hooks);

  test('it finds by label for attribute', async function(assert) {
    // Template block usage:
    await render(hbs`
      <label for='control'>Location</label>
      {{input id="control" type="text"}}
    `);
    await fillIn('Location', 'hello world');
    let input = find('input');
    assert.equal(input.value, 'hello world');
  });
});
