import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { select } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';

module('Integration | Helper | select', function(hooks) {
  setupRenderingTest(hooks);

  test('fills in using label', async function(assert) {
    // Template block usage:
    await render(hbs`
      <label for='control'>Location</label>
      <select id="control">
        <option value="1">qqq</option>
        <option value="2">aaa</option>
        <option value="3">bbb</option>
      </select>
    `);
    assert.notEqual(find('#control').value,2)
    await select('Location', 'aaa');
    assert.equal(find('#control').value,2)
  });

  test('fills in using label', async function(assert) {
    // Template block usage:
    await render(hbs`
      <label for='control'>Location</label>
      <select id="control">
        <option value="1">qqq</option>
        <option value="2">aaa</option>
        <option value="3">bbb</option>
      </select>
    `);
    assert.notEqual(find('#control').value,2)
    try {
      await select('Location', 2);
    } catch(e){
      assert.equal(e.message, 'You tried to fill in using value "2" instead of the semantic label "aaa"')
    }
  });
})
