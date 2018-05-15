import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { select } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';
import { registerFiller, customFillers } from 'ember-semantic-test-helpers/test-support/config';

module('Integration | Helper | Custom Fillers', function(hooks) {
  setupRenderingTest(hooks);

  module('select', function(hooks){
    hooks.afterEach(function(){
      customFillers.select = [];
    });
    test('select will use custom filler if present', async function(assert){
      await render(hbs`
      <label for="ember6766">craycray</label>
      <div id="ember6766" class="ember-view">
        <select id="ember6779" placeholder="Select a supplier" class="ember-view selectized" tabindex="-1" style="display: none;">
           <option value="" selected="selected"></option>
        </select>
        <div class="selectize-control ember-view single plugin-continue_editing">
           <div class="selectize-input items not-full"><input type="text" autocomplete="off" tabindex="0" placeholder="Select a supplier" style="width: 93px;"></div>
           <div class="selectize-dropdown single ember-view plugin-continue_editing" style="display: none;">
              <div class="selectize-dropdown-content">
                 <div data-value="1" data-selectable="" class="option active">GotWood</div>
                 <div data-value="2" data-selectable="" class="option">Sporty's</div>
              </div>
           </div>
        </div>
      </div>
      `);

      registerFiller({
        type:'select',
        run:function(control, value){
          let options = document.querySelectorAll(`#${control.parentElement.attributes.id.value} .option`);
          let element = Array.prototype.slice.call(options).find(function(element){
            return element.innerText === value
          })
          control.options[0].innerText = element.innerText;
          return true;
        }
      });

      await select('craycray', 'GotWood');
      let option = find('option');
      assert.equal(option.innerText, 'GotWood');
    });
  });

});
