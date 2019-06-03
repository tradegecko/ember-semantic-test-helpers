# ember-semantic-test-helpers

[![npm version](https://badge.fury.io/js/ember-semantic-test-helpers.svg)](https://www.npmjs.com/package/ember-semantic-test-helpers)
[![Build Status](https://travis-ci.org/tradegecko/ember-semantic-test-helpers.svg?branch=master)](https://travis-ci.org/tradegecko/ember-semantic-test-helpers)


Exposes semantic helpers based on https://github.com/emberjs/rfcs/pull/327 RFC

The goal of this addon is to promote a path way to aria compatibility for ember applications and addons. while improving developer ergonomics.

An element must be perceivable to  **assistive technologies** in order to have a democratized internet.
If an element is not perceivable then it is should not be perceivable to tests either.

Instead of searching for elements using css selectors you will use what is present on your ui, the happy path is that your ui is aria compliant and this addon would just work. Since their are many applications that are not compliant, if we don't explode but we use configurable strategies to find and fill in elements.



Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------
```bash
ember install ember-semantic-test-helpers
```

Basic Usage
------------------------------------------------------------------------------

```js
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
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
Interacting with elements
------------------------------------------------------------------------------
Elements are differentiated by their modes of interaction. here is a list of interactions and corresponding helpers:
1. dropdowns - `select`
2. input boxes - `fillIn`
3. toggles - `toggle`
4. clickable elements - `click`

The definition of what elements are select/text.. can be found  [here](https://github.com/tradegecko/ember-semantic-test-helpers/blob/master/addon-test-support/definitions/types.js). These definitions will improve and grow over time, let us know if something is missing, or incorrectly defined.

How elements are found.
------------------------------------------------------------------------------
An element is perceived using the [Text alternative spec](https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_te), which is implemented [here](https://github.com/tradegecko/semantic-dom-selectors/blob/master/src/finders/find-by-aria/compute-aria.js)


If your element does not follow this spec we currently comes support 2 fallback finding strategies.

1. **perceivedByName**, uses `[name=""]`

2. **invalidFor**, Not all elements are equal if your labels `[for=""]` targets an element that is not an HTML semantic form control, it is not aria compliant.

if an element is found using a fallback strategy it is considered an error, the severity of that error can be configured. by default all rules are set to 1

```js
import config from 'ember-semantic-test-helpers/test-support/config';

config.setErrorLevels({
  invalidFor: 0 //Throw error
  perceivedByName: 2 //silence
  myCustomRule: 1 //log to console
})

```

Trimming
------------------------------------------------------------------------------
Change the way we trim the inner text of dom. by default we normalize it all line breaks and mutli-spaces to 1space.

```js
import config from 'ember-semantic-test-helpers/test-support/config';

config.trim = function(text){ return text }
//if you don't want it to be trim
```

If you need to build more fallback strategies
------------------------------------------------------------------------------
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
Actors
------------------------------------------------------------------------------
Elements are interacted with using actors. `toggle`,`select`, `click`, `fillin` helpers are all actors. The problem arises that there is a diverse set of customised form controls, that either this addon does not support the aria spec completely yet, or that are just not compliant at all. In order to resolve this, you can define your own actors.

Actors are by the base helpers, `toggle`,`select`, `click`, `fillin`

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
function findButton(label: string): HTMLElement
```

```ts
function findControl(label: string, type: 'text' | 'toggle' | 'select' | 'form' | 'button'): HTMLElement
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
