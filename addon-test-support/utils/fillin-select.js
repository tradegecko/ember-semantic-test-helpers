import { findAll, fillIn } from '@ember/test-helpers';

export default async function(control, value){
  let options = await findAll(`#${control.attributes.id.value} option`);
  let option = options.find((option) => {
    return option.innerText === value
  })
  if(!option){
    option = options.find((option) => {
      return option.attributes.value.value == value
    })
    if(option){
      throw new Error(`You tried to fill in using value "${value}" instead of the semantic label "${option.innerText}"`)
    }
    let suggestions = options.map((option) => { return option.innerText }).join(',');
    throw new Error(`Could not find option ${value}, possible options are ${suggestions}`)
  }
  return fillIn(control, option.attributes.value.value);
}
