var EOL = require('os').EOL;

module.exports = {
  description: 'Adds initialisation file of ember semantic test helpers',

  afterInstall: function() {
    var TEST_HELPER_PATH = 'tests/test-helper.js';
    var IMPORT_STATEMENTS = [`import './helpers/semantic-assertions';`, `import './helpers/semantic-selectors';`];

    return this.insertIntoFile(TEST_HELPER_PATH, EOL+ IMPORT_STATEMENTS.join(EOL));

  },

  normalizeEntityName: function() {}
};
