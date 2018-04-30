import AmbiguousLabel from './errors/ambiguous-label';
import MissingObject from './errors/missing-object';
import InvalidFor from './errors/invalid-for';
import PercivedByName from './errors/percived-by-name';

export default {
  ambiguousLabel: 1,
  invalidFor: 1,
  percivedByName: 1,
  ariaNotFound: 1
}


export let errors = {
  ambiguousLabel: AmbiguousLabel,
  invalidFor: InvalidFor,
  percivedByName: PercivedByName,
  ariaNotFound: MissingObject
}

export let buildMessage = function(error, type, labelText){
  switch(error){
    case 'ambiguousLabel' :
      return  `Multiple ${type} labelled ${labelText} where found`
    case 'ariaNotFound' :
        return `Could not find ${type} labelled '${labelText}'`
  }
}
