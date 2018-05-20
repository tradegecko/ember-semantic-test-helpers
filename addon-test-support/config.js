import findByAria from './dom/find-by-aria';
import findByLabel from './dom/fallbacks/find-by-label';
import findByName from './dom/fallbacks/find-by-name';

let baseFinder = {
  key:'ariaNotFound',
  run: findByAria
}

class Config {
  constructor(){
    this.registeredFinders = [];
    this.defaultFinders = [baseFinder,findByLabel,findByName];
    this.errorLevelOptions = {};
    this.customActors = {
      select: [],
      text: [],
      toggle: [],
      button: [],
    }
  }

  registerFinder(finder){
    this.rules[finder.key] = 1;
    this.registeredFinders.push(finder)
  }

  registerActor({type, run}){
    this.customActors[type].push(run);
  }

  setErrorLevels(config) {
    this.errorLevelOptions = config
  }

  get actors(){
    return this.customActors;
  }

  get finders(){
    return this.defaultFinders.concat(this.registeredFinders);
  }

  get rules(){
    let rules = this.finders.reduce((acc,finder) => {
      let config = this.errorLevelOptions[finder.key];
      if(isNaN(config)){
        acc[finder.key] =  1;
      } else {
        acc[finder.key] = config;
      }
      return acc;
    },{});
    return rules;
  }
}

export default new Config();
