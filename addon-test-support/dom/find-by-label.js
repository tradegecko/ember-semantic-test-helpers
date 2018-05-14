import findByAria from './find-by-aria';

export default function findByLabel(selector, text) {
  let label = findByAria('label', text);
  if(label.length) {
    label = label[0]
    let target = label.attributes.for;
    if(target && target.value){
      let elements = selector.split(',');
      let id = target.value;
      selector = elements.map((element) => {
        if(element[0] === '[') {
          return `#${id} ${element},#${id}${element} `
        } else {
          return `#${id} ${element}`
        }

      }).join(',');
      elements = document.querySelectorAll(selector);
      if(elements){
        return elements;
      } else {
        return document.getElementById(id);
      }
    } else {
      throw new Error(`Label was found for ${text} but it did not have a for attribute`)
    }

  }
}
