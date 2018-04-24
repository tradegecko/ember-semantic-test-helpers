import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { findButton } from 'ember-semantic-test-helpers/test-support';
import { find } from 'ember-test-helpers';

async function assertMissingButton(assert, text){
  let button = null;
  try{
    button = await findButton(text);
  } catch(e) {
    assert.equal(e.message, `Could not find button labelled '${text}'`)
  }
  assert.equal(button, undefined);

}
module('Integration | Helper | findButton', function(hooks) {
  setupRenderingTest(hooks);

  test('find by aria-labelledby', async function(assert) {
    let button = null;
    await render(hbs`
      <span id="span1">Hello</span>
      <span id="span2">World</span>
      <label for="mybutton">best button</label>
      <button id="mybutton" aria-labelledby="span1 span2" aria-label="qqq" title="interesting">asd</button>
    `);
    button = await findButton('hello world');
    assert.equal(button, find('button'));
    assertMissingButton(assert, 'qqq')
    assertMissingButton(assert, 'interesting')
    assertMissingButton(assert, 'asd')
    assertMissingButton(assert, 'bestbutton')
  });

  test('find by aria-label', async function(assert) {
    // Template block usage:
    await render(hbs`
      <label for="mybutton">best button</label>
      <button id="mybutton" aria-label="qqq" title="interesting">asd</button>
    `);
    let button = await findButton('qqq');
    assert.equal(button, find('button'));
    assertMissingButton(assert, 'interesting')
    assertMissingButton(assert, 'asd')
    assertMissingButton(assert, 'bestbutton')
  });

  test('find by label', async function(assert) {
    // Template block usage:
    let button = null;
    await render(hbs`
      <label for="mybutton">best</label>
      <label for="mybutton">button</label>
      <button id="mybutton" title="interesting">asd</button>
    `);
    button = await findButton('bestbutton');
    assert.equal(button, find('button'));
    assertMissingButton(assert, 'interesting')
    assertMissingButton(assert, 'asd')

    await render(hbs`
      <label for="mybutton">best button</label>
      <button id="mybutton" title="interesting">asd</button>
    `);
    button = await findButton('best button');
    assert.equal(button, find('button'));
  });


  test('find by innerText', async function(assert) {
    // Template block usage:
    let button = null;
    await render(hbs`
      <button id="mybutton" title="interesting">asd</button>
    `);
    button = await findButton('asd');
    assert.equal(button, find('button'));
    assertMissingButton(assert, 'interesting')
  });

  test('find by title', async function(assert) {
    // Template block usage:
    let button = null;
    await render(hbs`
      <button id="mybutton" title="interesting"></button>
    `);
    button = await findButton('interesting');
    assert.equal(button, find('button'));
  });

  test('finds tag a', async function(assert) {
    await render(hbs`
      <a href="#">some link</a>
    `);
    let button = await findButton('some link');
    assert.equal(button, find('a'));
  });

  test('finds tag [role="button"]', async function(assert) {
    await render(hbs`
      <span role="button" tabindex="0" onclick="handleBtnClick()" onKeyPress="handleBtnKeyPress()">Save</span>
    `);
    let button = await findButton('save');
    assert.equal(button, find('[role="button"]'));
  });

  test('finds tag input[type="reset"]', async function(assert) {
    await render(hbs`
      <input type="reset" value="Reset the form">
    `);
    let button = await findButton('Reset the form');
    assert.equal(button, find('input[type="reset"]'));
  });

  test('finds tag input[type="button"]', async function(assert) {
    await render(hbs`
      <input type="button" title="a button" value="Click me">
    `);
    let button = await findButton('Click me');
    assert.equal(button, find('input[type="button"]'));
  });


  test('finds tag input[type="submit"]', async function(assert) {
    await render(hbs`
      <input type="submit" title="a button" value="Submit">
    `);
    let button = await findButton('suBmit');
    assert.equal(button, find('input[type="submit"]'));
  });

  test('finds tag [role="link"]', async function(assert) {
    await render(hbs`
      <div role="link">A link</div>
    `);
    let button = await findButton('A link');
    assert.equal(button, find('[role="link"]'));
  });

  test('finds tag [role="menuitem"]', async function(assert) {
    await render(hbs`
      <a role="menuitem" href="https://www.w3.org/standards/webdesign/accessibility">
        W3C Web Accessibility Initiative
      </a>
    `);
    let button = await findButton('W3C Web Accessibility Initiative');
    assert.equal(button, find('[role="menuitem"]'));
  });
});
