/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this.import('node_modules/semantic-dom-selectors/dist/semantic-dom-selectors.js', { type: 'test' });
    this.import('node_modules/semantic-dom-selectors/dist/semantic-dom-selectors.map', { type: 'test' });
    this.import('node_modules/qunit-semantic-assertions/dist/qunit-semantic-assertions.js', { type: 'test' });
    this.import('node_modules/qunit-semantic-assertions/dist/qunit-semantic-assertions.map', { type: 'test' });
  }
}
