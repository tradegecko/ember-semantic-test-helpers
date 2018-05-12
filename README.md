# ember-semantic-test-helpers

[![npm version](https://badge.fury.io/js/ember-semantic-test-helpers.svg)](https://www.npmjs.com/package/ember-semantic-test-helpers)
[![Build Status](https://travis-ci.org/tradegecko/ember-semantic-test-helpers.svg?branch=master)](https://travis-ci.org/tradegecko/ember-semantic-test-helpers)


Exposes semantic helpers based on https://github.com/emberjs/rfcs/pull/327 rfc

Installation
------------------------------------------------------------------------------
```bash
ember install ember-semantic-test-helpers
```


Usage
------------------------------------------------------------------------------

```js
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, fillIn, select, toggle } from 'ember-semantic-test-helpers/test-support';

module('Login', function(hooks) {
  setupApplicationTest(hooks);

  test('Logging in', async function(assert) {
    await visit('/login');
    await fillIn('Email', 'alice@example.com');
    await fillIn('Password', 'topsecret');
    await select('Some label targeting a select', 123)
    await toggle('keep me logged in')
    await click('Log in');
  });
});
```

Fallback
------------------------------------------------------------------------------
We cannot expect every app to be 100% aria compliant at the moment, for that reason,
their are fallback element finders.


1. perceivedByName
Will search for controls using the name attribute
```html
<input name="hello" />
```
2. invalidFor
label[for] can only target form elements, but it is common that they target `div` elements.
It will deeply search that div for the first of the following:

- fillIn -> text control
- select -> select control
- toggle -> toggleable control

exact definitions of these can be found `addon-test-support/dom/types`;

```html
<label for="my-cutom-control" />
<div id="my-custom-control"><input></div>
```

By default if the control is found using these strategies a warning will be logged,
this behaviour can be configured.

```js
import { config } from 'ember-semantic-test-helpers/test-support';

config.perceivedByName = <level>
config.invalidFor = <level>
```

the levels:
- 0: will throw an error.
- 1: will throw a warning.
- 2: will silence.

ideally these warnings are fixed as one would deprecations and once fixed you can,
set the level to 0, so that there are no more regressions.

API
------------------------------------------------------------------------------

This addon defines a few ux/accessible semantic helpers.

#### High level
```ts
function click(label: string): Promise<void>
```
Internally uses `findButton`, then invokes `click` from `ember-test-helpers`

```ts
function select(label: string, value): Promise<void>
```
Internally uses `findControl`, then invokes a custom select function that will select based on label instead of value

```ts
function toggle(label: string): Promise<void>
```
Internally uses `findControl`, then invokes `click` from `ember-test-helpers` on that control

```ts
function fillIn(label: string, value): Promise<void>
```

Internally uses `findControl`, then invokes `fillIn` from `ember-test-helpers` on that control

#### low level
```ts
function findButton(label: string, value): HTMLElement
```
Searches the page for the following

```js
'button',
'a',
'[role="button"]',
'input[type="reset"]',
'input[type="button"]',
'input[type="submit"]',
'[role="link"]',
'[role="menuitem"]',
```
Then computes the label for each control using [Text alternative spec](https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_te) either returns the result or an ergonomic error

```ts
function findControl(label: string, value): HTMLElement
```

Searches the page for the following
```js
//use fillIn helper for these
let inputs = [
  'input',
  'textarea',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="textbox"]',
  '[contenteditable="true"]',
]

//use toggle helper for these
let toggles = [
  '[role="checkbox"]',
]

//use select helper helper for these
let selectables = [
  'select',
  '[role="listbox"]',
  '[role="radiogroup"]',
]
```

Then computes the label for each control using [Text alternative spec](https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_te) either returns the result or an ergonomic error


Contributing
------------------------------------------------------------------------------

#### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

#### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

#### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

#### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
