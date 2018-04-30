import findObjects from './find-objects';
import AmbiguousLabel from './errors/ambiguous-label';

export default function (selector, labelText) {
  let objects = findObjects(selector, labelText)
  if(objects.length > 1){
    throw new AmbiguousLabel(`multiple objects found for ${labelText}`);
  }
  return objects[0]
}
