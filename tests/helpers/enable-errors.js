import config from 'ember-semantic-test-helpers/test-support/config';

export default function(hooks, levels){
  hooks.beforeEach(function(){
    if(!isNaN(levels)){
      levels = Object.keys(config.rules).reduce((acc, rule) => {
        acc[rule] = levels;
        return acc;
      }, {})
    }
    config.setErrorLevels(levels);
  });

  hooks.afterEach(function(){
    config.setErrorLevels({});
  });
}
