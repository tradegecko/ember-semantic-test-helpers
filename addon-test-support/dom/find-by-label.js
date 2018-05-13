import findByAria from './find-by-aria';

export default function findByLabel(selector, text) {
  let elements = selector.split(',');
  let label = findByAria('label', text);
  if(label.length) {
    label = label[0]
    let id = label.attributes.for.value;
    selector = elements.map((element) => {
      if(element[0] === '[') {
        return `#${id} ${element},#${id}${element} `
      } else {
        return `#${id} ${element}`
      }

    }).join(',');
    return  document.querySelectorAll(selector);
  }
}
