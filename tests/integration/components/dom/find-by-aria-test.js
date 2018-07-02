import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { findByAria, buttonQuery } from 'semantic-dom-selectors';

module('Integration | Helper | findByAria', function(hooks) {
  setupRenderingTest(hooks);

  test('it traverses aria-labelledby', async function(assert){
    await render(hbs`
      <div>
        <a id="file_row1" href="./files/Documentation.pdf">Documentation.pdf</a>
        <span role="button" tabindex="0" id="del_row1" aria-label="Delete" aria-labelledby="del_row1 file_row1"></span>
      </div>
    `);
    let foundButton = findByAria(buttonQuery, 'delete documentation.pdf');
    let expected = document.querySelector("#del_row1");
    assert.equal(foundButton.length, 1);
    assert.equal(foundButton[0], expected);
  });

  test('it traverses aria-labelledby in order', async function(assert){
    await render(hbs`
      <div>
        <a id="file_row1" href="./files/Documentation.pdf">Documentation.pdf</a>
        <span role="button" tabindex="0" id="del_row1" aria-label="Delete" aria-labelledby="file_row1 del_row1"></span>
      </div>
    `);
    let foundButton = findByAria(buttonQuery, 'documentation.pdf delete');
    let expected = document.querySelector("#del_row1");
    assert.equal(foundButton.length, 1);
    assert.equal(foundButton[0], expected);
  });

  test('it works with aria-label w/o aria-labelledby', async function(assert){
    await render(hbs`
      <div>
        <a id="file_row1" href="./files/Documentation.pdf">Documentation.pdf</a>
        <span role="button" tabindex="0" id="del_row1" aria-label="Delete"></span>
      </div>
    `);
    let foundButton = findByAria(buttonQuery, 'delete');
    let expected = document.querySelector("#del_row1");
    assert.equal(foundButton.length, 1);
    assert.equal(foundButton[0], expected);
  });
});
