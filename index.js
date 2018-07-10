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
    let semanticTestHelperTree = new Funnel(`${this.project.root}/node_modules/semantic-dom-selectors/dist`, {
      files: ['semantic-dom-selectors.js', 'semantic-dom-selectors.js.map'],
    });
    if(vendorTree){
      //if tree is for app this is not null
      return new MergeTrees([vendorTree, semanticTestHelperTree]);
    } else {
      //if is an addon this is null
      return semanticTestHelperTree;
    }
  },
}
