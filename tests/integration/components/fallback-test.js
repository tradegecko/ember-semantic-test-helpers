import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import enableErrors from './../../helpers/enable-errors';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { fillIn } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';
import sinon from 'sinon';

module('Integration | Helper | fallbacks', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function(){
    this.sandbox = sinon.sandbox.create();
  })

  hooks.afterEach(function(){
    this.sandbox.restore();
  })

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
        try {
          await fillIn('Location', 'awesomerable');
        } catch(e){
          assert.equal(e.message, 'Control Location found through invalid label for relationship')
          //assert.equal(e.constructor.name, 'InvalidFor')
        }
      });
    });

    module('level 1', function(hooks){
      enableErrors(hooks, {invalidFor:1});
      test('Fills input and produces a warning', async function(assert){
        let spy = this.sandbox.spy(console, 'warn');
        await fillIn('Location', 'awesomerable');
        let input = find('#control input');
        assert.equal(input.value, 'awesomerable');
        assert.ok(spy.calledWith('Control Location found through invalid label for relationship'));
        assert.ok(spy.calledOnce)
      });
    });

    module('level 2', function(hooks){
      enableErrors(hooks, {invalidFor:2});
      test('Fills input, silently', async function(assert){
        let spy = this.sandbox.spy(console, 'warn');
        await fillIn('Location', 'awesomerable');
        let input = find('#control input');
        assert.equal(input.value, 'awesomerable');
        assert.equal(spy.called, false);
      });
    });
  });

  module('perceivedByName', function(hooks){
    hooks.beforeEach(async function() {

      await render(hbs`
        {{input type="text" name="location"}}
      `);
    });
    module('level 0', function(hooks){
      enableErrors(hooks, {perceivedByName:0});
      test('Does not fill input, produces an error', async function(assert){
        try {
          await fillIn('location', 'awesomerable');
        } catch(e){
          assert.equal(e.message, 'Control location found through input name attribute')
          //assert.equal(e.constructor.name, 'PerceivedByName')
        }
      });
    });

    module('level 1', async function(hooks){
      enableErrors(hooks, {perceivedByName:1});
      test('Fills input and produces a warning', async function(assert){
        let spy = this.sandbox.spy(console, 'warn');
        await fillIn('location', 'awesomerable');
        let input = find('input');
        assert.equal(input.value, 'awesomerable');
        assert.ok(spy.calledWith('Control location found through input name attribute'));
        assert.ok(spy.calledOnce)
      })
    });

    module('level 2', function(hooks){
      enableErrors(hooks, {perceivedByName:2});
      test('Fills input, silently', async function(assert){
        let spy = this.sandbox.spy(console, 'warn');
        await fillIn('location', 'awesomerable');
        let input = find('input');
        assert.equal(input.value, 'awesomerable');
        assert.equal(spy.called, false);
      });
    });
  });
});
