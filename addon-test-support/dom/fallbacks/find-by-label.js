import findByAria from '../find-by-aria';

export default {
  run: findByLabel,
  key: 'invalidFor',
  errorText: function(type, labelText){
    return `Control ${labelText} found through invalid label for relationship`;
  }
}

function findByLabel(selector, text) {
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
      if(elements && elements.length){
        return elements;
      } else {
        return [document.getElementById(id)];
      }
    } else {
      throw new Error(`Label was found for ${text} but it did not have a for attribute`)
    }

  }
}
