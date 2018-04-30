import { config } from 'ember-semantic-test-helpers/test-support';

export default function(hooks){
  hooks.beforeEach(function(){
    Object.keys(config).forEach(function(value){
      config[value] = 0;
    })
  });

  hooks.afterEach(function(){
    Object.keys(config).forEach(function(value){
      config[value] = 1;
    })
  })
}
