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

export let buildMessage = function(error, type, labelText){
  switch(error){
    case 'perceivedByName' :
      return `Control ${labelText} found through input name attribute`;
    case 'invalidFor' :
      return `Control ${labelText} found through invalid label for relationship`;
    case 'ambiguousLabel' :
      return  `Multiple ${type} labelled ${labelText} where found`;
    case 'missingObject' :
      return `Could not find ${type} labelled '${labelText}'`;
  }
}
