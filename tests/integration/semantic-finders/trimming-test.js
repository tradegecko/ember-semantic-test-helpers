import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { findButton } from 'semantic-dom-selectors';

module.only('Integration | Helper | trimming', function(hooks) {
  setupRenderingTest(hooks);

  test('it traverses aria-labelledby', async function(assert){
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
});
