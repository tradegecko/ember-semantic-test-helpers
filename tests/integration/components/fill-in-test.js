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


  test('it finds aria-label attribute', async function(assert) {
    // Template block usage:
    await render(hbs`
      <input aria-label="location" type="text" />
    `);
    await fillIn('location', 'hello mars');
    let input = find('input');
    assert.equal(input.value, 'hello mars');
  });


  test('it finds aria-labelledby attribute', async function(assert) {
    // Template block usage:
    await render(hbs`
      <div id="billing">Billing</div>
      <div id="name">Name</div>
      <input type="text" aria-labelledby="billing name"/>
    `);
    await fillIn('Billing Name', 'expensive');
    let input = find('input');
    assert.equal(input.value, 'expensive');
  });

  test('if aria-labelledby is present it will ignore aria-label attribute', async function(assert) {
    // Template block usage:
    await render(hbs`
      <div id="billing">Billing</div>
      <div id="name">Name</div>
      <input type="text" aria-labelledby="billing name" aria-label='Location'/>
    `);
    try {
      await fillIn('Location', 'expensive');
    } catch(e) {
      assert.equal(e.message, `Can't find label Location`)
    }

  });
});
