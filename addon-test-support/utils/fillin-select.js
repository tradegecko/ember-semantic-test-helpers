import { findAll, fillIn } from '@ember/test-helpers';

export default async function(control, value){
  let options = await findAll(`#${control.attributes.id.value} option`);
  let option =options.find((option) => {
    return option.innerText === value
  })
  if(!option){
    throw new Error(`could not find option ${value}`)
  }
  return fillIn(control, option.attributes.value.value);
}
