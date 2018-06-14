import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { fillIn } from 'ember-semantic-test-helpers/test-support';
import config from 'ember-semantic-test-helpers/test-support/config';
import enableErrors from './../../helpers/enable-errors';

module('Integration | Helper | Custom Fillers', function(hooks) {
  setupRenderingTest(hooks);

  module('custom finder', function(hooks){

    hooks.beforeEach(function() {
      config.registerFinder({
        key:'awesomeFinder',
        run(selector, label) {
          return document.querySelectorAll(`[x-data="${label}"]`);
        },
        errorMessage: function(type, labelText){
          return `you found ${labelText} using the x-data finder`;
        }
      })
    });

    enableErrors(hooks, {awesomeFinder: 0});

    test('finder finds element', async function(assert) {
      await render(hbs`
        <input aria-label="cool" x-data="cool" />
      `);
      try {
        await fillIn('cool', 'some-text')
      } catch(e) {
        assert.equal(e.message, `Custom rule awesomeFinder found Text Control labelled 'cool'`)
      }
    });
  })
});
