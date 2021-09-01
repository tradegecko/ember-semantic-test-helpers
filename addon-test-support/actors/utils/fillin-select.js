import { findAll, fillIn, click, settled } from '@ember/test-helpers';

export default async function(control, value){
  let options = await findAll(`#${control.attributes.id.value} option, [role="option"], [role="alert"]`);
  let option = options.find((option) => {
    return option.innerText.replace(/\r?\n|\r/g,'').trim().toLowerCase() === (""+value).toLowerCase()
  })
  if(!option){
    option = options.find((option) => {
      if(option.attributes.value){
        return option.attributes.value.value == value
      }
    })
    if(option){
      throw new Error(`You tried to fill in using value "${value}" instead of the semantic label "${option.innerText}"`)
    }
    let suggestions = options.map((option) => { return option.innerText }).join(',');
    throw new Error(`Could not find option ${value}, possible options are ${suggestions}`)
  }
  if(control.tagName === 'SELECT') {
    return fillIn(control, option.attributes.value.value);
  } else {
    await click(option);
    return settled();
  }

}
