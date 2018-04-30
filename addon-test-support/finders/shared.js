import AmbiguousLabel from '../errors/ambiguous-label';
import MissingObject from '../errors/missing-object';

export default function SharedFind(findFunc, labelText, name) {
  try {
    let objects = findFunc(labelText);
    if(objects.length > 1){
      throw new AmbiguousLabel(`Multiple ${name} labelled ${labelText} where found`)
    }
    return objects[0]
  } catch(e){
    if(e instanceof MissingObject){
      throw new MissingObject(`Could not find ${name} labelled '${labelText}'`)
    }
  }
}
