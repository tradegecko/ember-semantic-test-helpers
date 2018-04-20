import { findAll, find } from "@ember/test-helpers";

export default function findLabel(labelText) {
  let label = findAll('label').find( label => { return label.innerText === labelText });
  if(!label){
    label = findAll('[aria-labelledby]').map( (element) => {
        return {label:element.attributes['aria-labelledby'].value, element}
    }).map( (elementHash) => {
      let label = elementHash.label.split(' ').map( (id) => {
        return find(`#${id}`).innerText
      }).join(' ')
      return {label, element:elementHash.element}
    }).find( (elementHash) => {
       return elementHash.label === labelText
    });
    if(label){
      label = label.element
    }
  }
  if(!label){
    label = findAll('[aria-label]').find( control => {
      if(!control.attributes['aria-labelledby']){
        return control.attributes['aria-label'].value === labelText
      }
    });
  }
  return label;
}
