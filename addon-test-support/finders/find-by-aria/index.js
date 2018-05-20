import computeAria from './compute-aria';
import { findAll } from "@ember/test-helpers";

export default function findByAria(selector, labelText) {
  return findAll(selector).filter( (element) => {
    return computeAria(element) === labelText.toLowerCase()
  });
}
