import InvalidFor from './errors/invalid-for';
import PerceivedByName from './errors/perceived-by-name';
import MissingObject from './errors/missing-object';
import findByAria from './dom/find-by-aria';
import findByLabel from './dom/find-by-label';
import findByName from './dom/find-by-name';

export default {
  invalidFor: 1,
  perceivedByName: 1,
}


export let errors = {
  invalidFor: InvalidFor,
  perceivedByName: PerceivedByName,
  missingObject: MissingObject,
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


let functions = {
  ariaNotFound: findByAria,
  invalidFor: findByLabel,
  perceivedByName: findByName
}

export let strategies = Object.keys(functions).map(function(key){
  return [key,functions[key]];
});
