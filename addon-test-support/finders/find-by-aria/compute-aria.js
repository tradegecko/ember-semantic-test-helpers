const computeTextAlternativeForElement = (element, label = '') => {
  if(!label && element.attributes['aria-label'] && element.attributes['aria-label'].value){
    label = element.attributes['aria-label'].value;
  }

  if(!label && element.labels && element.labels.length){
    label = Array.prototype.slice.call(element.labels).map( (label) => {
      return label.innerText
    }).join('');
  }

  //find rare case of type=image and alt
  if(!label && element.attributes.type && element.attributes.type.value === "image"){
    if(element.attributes['alt']) {
      label = element.attributes['alt'].value;
    } else if(element.attributes['title']) {
      label = element.attributes['title'].value;
    }
  }

  //try innerText for buttons
  if(!label && element.innerText){
    label = element.innerText;
  }

  //try value for input as buttons
  if(!label && element.value){
    label = element.value;
  }
  //lastly use title
  if(!label && element.attributes.title && element.attributes.title.value){
    label = element.attributes['title'].value;
  }

  return label;
}

export default function(element){
  let label = '';

  //first travese one depth of lablledby
  if(element.attributes['aria-labelledby'] && element.attributes['aria-labelledby'].value) {
    let ids = element.attributes['aria-labelledby'].value;
    label = ids.split(' ').map( (id) => {
      let element = document.querySelector(`#${id}`);
      if(element){
        return computeTextAlternativeForElement(element);
      }
      return '';
    }).join(' ')
  } else {
    label = computeTextAlternativeForElement(element);
  }

  if(label) {
    label = label.toLowerCase().trim();
  }

  return label
}
