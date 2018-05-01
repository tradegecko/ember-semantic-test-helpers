import { config } from 'ember-semantic-test-helpers/test-support';

export default function(hooks, levels){
  hooks.beforeEach(function(){
    if(typeof levels === 'object') {
      Object.assign(config, levels);
    } else if (!isNaN(levels)) {
      Object.keys(config).forEach(function(value){
        config[value] = levels;
      })
    }
  });

  hooks.afterEach(function(){
    Object.keys(config).forEach(function(value){
      config[value] = 1;
    })
  });
}
