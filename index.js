'use strict';


/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-semantic-test-helpers',

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/semantic-dom-selectors.js', { type: 'test' });
  },

  treeForVendor(vendorTree) {
    let qunitPluginTree = new Funnel(`${__dirname}/node_modules/semantic-dom-selectors/dist`, {
      files: ['semantic-dom-selectors.js', 'semantic-dom-selectors.js.map'],
    });

    return new MergeTrees([vendorTree, qunitPluginTree]);
  },
};
