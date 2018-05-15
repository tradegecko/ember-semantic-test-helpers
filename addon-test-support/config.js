import findByAria from './dom/find-by-aria';
import findByLabel from './dom/fallbacks/find-by-label';
import findByName from './dom/fallbacks/find-by-name';

let rules = { }

let functions = {
  ariaNotFound: findByAria,
}

export let customFillers = {
  select: [],
  text: [],
  toggle: []
}

export default rules;

export function registerFinder({key, run}){
  rules[key] = 1;
  functions[key] = run;
}

export function unregisterFinder({key}){
  delete rules[key];
  delete functions[key];
}

registerFinder(findByName)
registerFinder(findByLabel)


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

export function strategies(){
  return Object.keys(functions).map(function(key){
    return [key,functions[key]];
  });
}
