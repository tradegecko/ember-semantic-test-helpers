import { findAll } from "@ember/test-helpers";
import computeAria from './utils/compute-aria';
import AmbiguousLabel from './errors/ambiguous-label';
import MissingObject from './errors/missing-object';

export default async function (selector, labelText) {
  let objects = findAll(selector).filter( (element) => {
    return computeAria(element) === labelText.toLowerCase()
  });
  if(objects.length > 1){
    throw new AmbiguousLabel(`multiple objects found for ${labelText}`);
  }
  if(objects.length == 0){
    throw new MissingObject(`No object labelled ${labelText} found`);
  }
  return objects[0]
}
