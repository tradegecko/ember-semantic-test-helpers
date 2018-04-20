import { findAll, find } from "@ember/test-helpers";

export default function findLabel(labelText) {
  let label = null
  let computedLabels = findAll('[aria-labelledby],[aria-label], [title], input[alt][type="image"], label[for]').map( (element) => {
    //if is a label and target does not have aria then it is a percived label
    if(element.tagName === 'LABEL' && element.attributes.for &&  element.attributes.for.value){
      let control = find('#'+element.attributes.for.value);
      if(!control.attributes['aria-label'] && !control.attributes['aria-labelledby']){
        label = element.innerText;
      }
     }

     //first travese one depth of lablledby
     if(!label && element.attributes['aria-labelledby'] && element.attributes['aria-labelledby'].value){
       let ids = element.attributes['aria-labelledby'].value;
       label = ids.split(' ').map( (id) => {
         return find(`#${id}`).innerText
       }).join(' ')
     }

     //then aria-label
     if(!label && element.attributes['aria-label'] && element.attributes['aria-label'].value){
       label = element.attributes['aria-label'].value;
     }

     //find rare case of type=image and alt
     if(!label && element.attributes.type && element.attributes.type.value === "image" && element.attributes.alt && element.attributes.alt.value){
       label = element.attributes['title'].value;
     }

     //lastly use title
     if(!label && element.attributes.title && element.attributes.title.value){
       label = element.attributes['title'].value;
     }

     if(label){
       return {label, element}
     }
  });
  let result = computedLabels.find( hash => { return hash.label === labelText });
  if(result){
    return result.element;
  }
}
