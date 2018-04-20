# Ember-semantic-test-helpers

Exposes semantic helpers based on https://github.com/emberjs/rfcs/pull/327 rfc

currently supports

### Definitions

A **link** is one of the following:

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
