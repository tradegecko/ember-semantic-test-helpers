import computeAria from './compute-aria';
import findAll from './../helpers/findAll';

export default function findByAria(selector, labelText) {
  return findAll(selector).filter( (element) => {
    return computeAria(element) === labelText.toLowerCase()
  });
}
