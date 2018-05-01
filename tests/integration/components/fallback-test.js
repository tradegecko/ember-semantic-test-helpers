import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import enableErrors from './../../helpers/enable-errors';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { fillIn } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';

module('Integration | Helper | fallbacks', function(hooks) {
  setupRenderingTest(hooks);

  module('invalidFor', function(hooks){
    hooks.beforeEach(async function() {

      await render(hbs`
        <label for='control'>Location</label>
        <div id="control">
          {{input type="text"}}
        </div>
      `);
    });
    module('level 0', function(hooks){
      enableErrors(hooks, {invalidFor:0});
      test('Does not fill input, produces an error', async function(assert){

      });
    });

    module('level 1', function(hooks){
      enableErrors(hooks, {invalidFor:1});
      test('Fills input and produces a warning', async function(assert){
        await fillIn('Location', 'awesomerable');
        let input = find('#control input');
        assert.equal(input.value, 'awesomerable');
      });
    });

    module('level 2', function(hooks){
      enableErrors(hooks, {invalidFor:2});
      test('Fills input, silently', async function(assert){

      });
    });
  });

  module('ambiguousLabel', function(hooks){
    hooks.beforeEach(async function() {

      await render(hbs`
        <label for='control'>Location</label>
        {{input id="control" type="text"}}
        <label for='control2'>Location</label>
        {{input id="control2" type="text"}}
      `);
    });
    module('level 0', function(hooks){
      enableErrors(hooks, {ambiguousLabel:0});
      test('Does not fill input, produces an error', async function(assert){

      });
    });

    module('level 1', function(hooks){
      enableErrors(hooks, {ambiguousLabel:1});
      test('Fills in first input and produces a warning', async function(assert){
        await fillIn('Location', 'awesome');
        let input = find('#control');
        assert.equal(input.value, 'awesome');
        input = find('#control2');
        assert.equal(input.value, '');
      });
    });

    module('level 2', function(hooks){
      enableErrors(hooks, {ambiguousLabel:2});
      test('Fills in first input, silently', async function(assert){

      });
    });
  });

  module('percivedByName', function(hooks){
    hooks.beforeEach(async function() {

      await render(hbs`
        {{input type="text" name="location"}}
      `);
    });
    module('level 0', function(hooks){
      enableErrors(hooks, {percivedByName:0});
      test('Does not fill input, produces an error', async function(assert){

      });
    });

    module('level 1', function(hooks){
      enableErrors(hooks, {percivedByName:1});
      test('Fills input and produces a warning', async function(assert){
        await fillIn('Location', 'awesomerable');
        let input = find('#control input');
        assert.equal(input.value, 'awesomerable');
      });
    });

    module('level 2', function(hooks){
      enableErrors(hooks, {percivedByName:2});
      test('Fills input, silently', async function(assert){

      });
    });
  });
});
