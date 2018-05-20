import findByAria from './dom/find-by-aria';
import findByLabel from './dom/fallbacks/find-by-label';
import findByName from './dom/fallbacks/find-by-name';

let rules = { }
export let finders = []


export let customFillers = {
  select: [],
  text: [],
  toggle: [],
  button: [],
}

export default rules;

export function registerFinder(finder, level){
  rules[finder.key] = level || 1;
  finders.unshift(finder)
}

export function unregisterFinder({key}){
  delete rules[key];
}

registerFinder(findByName)
registerFinder(findByLabel)
registerFinder({
  key:'ariaNotFound',
  run: findByAria
}, 2);

export function registerFiller({type, run}){
  customFillers[type].push(run);
}
