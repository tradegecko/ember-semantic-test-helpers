import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import FindByLabel from 'ember-semantic-test-helpers/test-support/dom/fallbacks/find-by-label';
import { textQuery } from 'ember-semantic-test-helpers/test-support/dom/selectors';
let findByLabel = FindByLabel.run
module('Integration | Helper | findByLabel', function(hooks) {
  setupRenderingTest(hooks);

  test('it selects the correct element', async function(assert){
    await render(hbs`
      <label for="expected">hello</label>
      <div id="expected">
        <input name="expected"  />
      </div>
      <textarea id="unexpected" />
    `);
    let foundInput = findByLabel(textQuery, 'hello');
    let expected = document.querySelectorAll("[name='expected']")[0];
    assert.equal(foundInput.length, 1);
    assert.equal(foundInput[0], expected);
  });


  test('if id is on control it finds control', async function(assert) {
    await render(hbs`
      <label for="control">Label of control</label>
      <div class="day-slider">
        <div id="control" class="day-slider-handle" role="slider"
           aria-valuemin="1"
           aria-valuemax="7"
           aria-valuenow="2"
           aria-valuetext="Monday">
       </div>
      </div>
    `);
    let foundInput = findByLabel(textQuery, 'Label of control');
    let expected = document.querySelectorAll('#control')[0];
    assert.equal(foundInput.length, 1);
    assert.equal(foundInput[0], expected);
  });
});
