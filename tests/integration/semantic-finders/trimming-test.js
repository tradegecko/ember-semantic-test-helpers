import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { findButton, findControl } from 'semantic-dom-selectors';

module('Integration | Helper | trimming', function(hooks) {
  setupRenderingTest(hooks);

  test('trims nested html tags properly', async function(assert){
    await render(hbs`
      <button id="expected">
        <h3>Button Title</h3>
        <p>Description</p>
      </button>
    `);
    let foundButton = findButton('Button Title Description')
    let expected = document.querySelector("#expected");
    assert.equal(foundButton, expected);
  });

  test('trims random visual whitespaces properly', async function(assert){
    await render(hbs`
      <label for="expected"> asd &nbsp;&nbsp;  <h1>qqq</h1> &#9; &#9; lll</label>
      <input id="expected"/>
    `);
    let found = findControl('asd qqq lll')
    let expected = document.querySelector("#expected");
    assert.equal(found, expected);
  });
});
