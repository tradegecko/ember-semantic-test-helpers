import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { findLabel } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | findLabel', function(hooks) {
  setupRenderingTest(hooks);

  test('matches alt tag only if type is image', async function(assert) {

    await render(hbs`
      <input alt="alt" />
    `);

    let label = findLabel('alt')
    assert.equal(label, undefined);

    await render(hbs`
      <input id="image" type="image" alt="Login"
  src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png">
    `);

    label = findLabel('Login')
    assert.equal(label, find('input'));

    await render(hbs`
      <input alt="alt" type="checkbox" />
    `);

    label = findLabel('alt')
    assert.equal(label, undefined);
  });

  test('matches label only if target does not have aria attributes', async function(assert){
    await render(hbs`
      <label for="hasit">custom input</label>
      <input id="hasit" aria-label="the best one ever" />
    `);

    let label = findLabel('the best one ever')
    assert.equal(label, find('input'));

    label = findLabel('custom input')
    assert.equal(label, undefined);

    await render(hbs`
      <label for="hasit">custom input</label>
      <input id="hasit" />
    `);

    label = findLabel('custom input')
    assert.equal(label, find('label'));
  });

  test('matches by title if no aria attributes, or targeting label', async function(assert){
    await render(hbs`
      <input id="hadTitle" title="only-title" />
    `);
    let label = findLabel('only-title')
    assert.equal(label, find('input'));

    await render(hbs`
      <input id="hadTitle" aria-label="xyz" title="only title" />
    `);

    label = findLabel('only title')
    assert.equal(label, undefined);

    await render(hbs`
      <label for="hadTitle">hi</label>
      <input id="hadTitle" title="only-title" />
    `);

    label = findLabel('only-title')
    assert.equal(label, undefined);
  });

  test('matches by aria-label', async function(assert){
    await render(hbs`
      <input aria-label="product name" />
    `);

    let label = findLabel('product name')
    assert.equal(label, find('input'));
  });

  test('matches by aria-labelledby', async function(assert){

    await render(hbs`
      <span id='x'>hi</span>
      <span id='y'>hi</span>
      <input aria-labelledby="x y" />
    `);

    let label = findLabel('hi hi')
    assert.equal(label, find('input'));
  });
});
