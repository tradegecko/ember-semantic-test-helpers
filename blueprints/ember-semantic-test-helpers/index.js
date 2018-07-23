var EOL = require('os').EOL;

module.exports = {
  description: 'Adds initialisation file of ember semantic test helpers',

  afterInstall: function() {
    var TEST_HELPER_PATH = 'tests/test-helper.js';
    var IMPORT_STATEMENT = EOL + "import './helpers/semantic-assertions';";

    return this.insertIntoFile(TEST_HELPER_PATH, IMPORT_STATEMENT);
  },

  normalizeEntityName: function() {}
};
