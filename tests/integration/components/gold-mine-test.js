import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click, select } from 'ember-semantic-test-helpers/test-support';

module('Integration | Gold Mine', function(hooks) {
  setupRenderingTest(hooks);

  module('Power Select', function(){
    test('fills in using label', async function(assert) {
      this.cities = ['Barcelona', 'London', 'New York', 'Porto'],
      this.destination = 'London',
      this.chooseDestination = function(city){
        this.set('destination', city);
      }
      await render(hbs`
        <label id="power">power select</label>
        {{#power-select
          ariaLabelledBy="power"
          selected=destination
          options=cities
          onchange=(action chooseDestination)
          as |name|
        }}
          {{name}}
        {{/power-select}}
      `);
      await click('power select');
      await select('power select', 'Barcelona');
      assert.equal(this.destination, 'Barcelona')
    });
  });

});
