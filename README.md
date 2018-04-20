# Ember-semantic-test-helpers

Exposes semantic helpers based on https://github.com/emberjs/rfcs/pull/327 rfc

currently supports

### Definitions

The **perceivable text** of a **link**, **button**, or other element may be
found in any/all of the following locations **if-and-only-if the element is
perceivable**:

- Its `innerText` property
- Its `title` attribute
- Its `alt` attribute
- Its `aria-label` attribute
- The **perceivable text** of the element identified by its `aria-labelledby` attribute

The **perceivable label** of a **perceivable form control** may be found in
any/all of the following locations:

- Its `aria-label` attribute
- The **perceivable text** of its **label**
- The **perceivable text** of the element identified by its `aria-labelledby` attribute
A **link** is one of the following:

if `aria-labelledby` is present it `aria-label` will not be perceivable to screen readers and there for not to this addon.

https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

- `a`


A **button** is one of the following:

- `button`


An **input** is one of the following:

- `input`
- `textarea`
- `select`


A **switch** is one of the following:

currently does not support checkboxes


Installation
------------------------------------------------------------------------------

```
ember install my-addon
```


Usage
------------------------------------------------------------------------------


```js
import { click, fillIn, select, toggle } from 'ember-semantic-test-helpers/test-support';
```


```js
test('Logging in', async function(assert) {
  await visit('/login');
  await fillIn('Email', 'alice@example.com');
  await fillIn('Password', 'topsecret');
  await select('Some lable targeting a select', 123)
  await toggle('keep me logged in', true)
  await click('Log in');
});
```

Caveats
------------------------------------------------------------------------------
- selecting an option is currently based on the value this will change to the label.
- currently does not support checkboxes
- does use a little bit of jquery

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
