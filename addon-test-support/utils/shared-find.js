import findObject from '../find-object';
import AmbiguousLabel from '../errors/ambiguous-label';
import MissingObject from '../errors/missing-object';

export default async function findButton(selector, labelText, name) {
  try {
    return await findObject(selector, labelText);
  } catch(e){
    if(e instanceof AmbiguousLabel){
      throw new AmbiguousLabel(`Multiple ${name} labelled ${labelText} where found`)
    } else if(e instanceof MissingObject){
      throw new MissingObject(`Could not find ${name} labeled '${labelText}'`)
    }
  }
}
