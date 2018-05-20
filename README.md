# ember-semantic-test-helpers

[![npm version](https://badge.fury.io/js/ember-semantic-test-helpers.svg)](https://www.npmjs.com/package/ember-semantic-test-helpers)
[![Build Status](https://travis-ci.org/tradegecko/ember-semantic-test-helpers.svg?branch=master)](https://travis-ci.org/tradegecko/ember-semantic-test-helpers)


Exposes semantic helpers based on https://github.com/emberjs/rfcs/pull/327 RFC

Installation
------------------------------------------------------------------------------
```bash
ember install ember-semantic-test-helpers
```

Concepts
------------------------------------------------------------------------------
Currently, there are a few elements managed by this addon.

1. select form controls
2. text form controls
3. toggle form controls
4. clickable elements.

this leads to the following helper functions in order :

1. `select`
2. `fillin`
3. `toggle`
4. `click`

The definition of what elements are select/text.. can be found  [here](https://github.com/tradegecko/ember-semantic-test-helpers/blame/master/addon-test-support/dom/types.js#L1). These definitions will improve and grow over time, let us know if something is missing, or incorrectly defined.


Basic Usage
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
**Finders**
Finders are passed a `selector: string` which encapsulates the various types as defined before. they then use various strategies to compute a label for the elements selected. This label is matched the passed `text`

Every finder should have a unique key that will be used for error level configuration.

Finally finders should implement and error text if they have matched, ideally, every finder will match find-by-aria, as this is the aria compliancy finder. if they do not it is considered an error, but we still want elements found so that developers can use the helpers. While providing a path to aria compliancy.

**Finder Object Defintion**
```ts
{
  key: string
  run: function(selector: string, text: string): HTMLElement
  errorText: function(type, labelText)
}
```


This package defines 3 finders.
1. **find-by-aria**,
uses [Text alternative spec](https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_te), to compute and compare labels of elements found by

2. **find-by-name**, uses `[name=""]`

3. **find-by-label**, Not all elements are equal if your labels `[for=""]` targets an element that is not an HTML semantic form control, it is not aria compliant.


**Actors**
`select`, `click`, `fillin` helpers are all actors. The problem arises that there is a diverse set of customised form controls, that either we don't support the aria spec completely yet, or that are just not compliant at all. In order to resolve this, you can define your own actors.

Actors are namespaced to their function eg select, or an actor that clicks. we support a finite set of these acts.

**Actor object definition**
```ts
{
  type: Enum('select', 'toggle', 'text', 'click')
  run:function(control: HTMLElement, value)
}
```
The type of value is different for each kind of actor

1. select `value: string`
2. toggle `value: null`
3. text `value: string`
4. click `value: null`

An example of a select actor can be found [here](https://github.com/tradegecko/ember-semantic-test-helpers/blame/master/tests/integration/components/custom-fillers-test.js#L19)


**Finders/Actors**

API
------------------------------------------------------------------------------
```ts
function click(label: string): Promise<void>
```

```ts
function select(label: string, value): Promise<void>
```

```ts
function toggle(label: string): Promise<void>
```

```ts
function fillIn(label: string, value): Promise<void>
```

```ts
function findButton(label: string, value): HTMLElement
```

```ts
function findControl(label: string, value): HTMLElement
```

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
