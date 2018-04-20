import { findAll, find } from "@ember/test-helpers";

export default function findLabel(labelText) {
  let label = findByInnerText(labelText);
  if(!label){
    label = findByAriaLabelledBy(labelText);
  }
  if(!label){
    label = findByAriaLabel(labelText);
  }
  return label;
}

function findByAriaLabelledBy(labelText){
  let label = findAll('[aria-labelledby]').map( (element) => {
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
    return label.element
  }
}

function findByInnerText(labelText){
  return findAll('label').find( label => { return label.innerText === labelText });
}

function findByAriaLabel(labelText){
  return findAll('[aria-label]').find( control => {
    if(!control.attributes['aria-labelledby']){
      return control.attributes['aria-label'].value === labelText
    }
  });
}
