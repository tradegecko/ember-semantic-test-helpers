import config from './config';

export default function(rule,  type, labelText, generateMessage){
  let rules = config.rules;
  let level = rules[rule];
  if(isNaN(level)){
    level = 0
  }
  let humanizedType = `${type.charAt(0).toUpperCase() + type.slice(1)} Control`
  let message = generateMessage ?
    generateMessage(humanizedType, labelText) :
    buildMessage(rule, humanizedType, labelText);

  switch(level){
    case 0:
      throw new Error(message)
    case 1:
      //eslint-disable-next-line no-console
      console.warn(message)
    }
}


function buildMessage(rule, type, labelText){
  switch(rule){
    case 'ambiguousLabel' :
      return  `Multiple ${type} labelled ${labelText} where found`;
    case 'missingObject' :
      return `Could not find ${type} labelled '${labelText}'`;
    default :
      return `Custom rule ${rule} found ${type} labelled '${labelText}'`
  }
}
