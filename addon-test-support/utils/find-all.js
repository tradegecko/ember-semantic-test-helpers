import { findAll } from "@ember/test-helpers";
import computeAria from './compute-aria';
import MissingObject from './../errors/missing-object';

export default function (selector, labelText) {
  let objects = findAll(selector).filter( (element) => {
    return computeAria(element) === labelText.toLowerCase()
  });
  if(objects.length == 0){
    throw new MissingObject(`No object labelled ${labelText} found`);
  }
  return objects;
}
