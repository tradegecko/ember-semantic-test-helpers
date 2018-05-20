import {default as config, buildMessage } from './config';

export default function(rule,  type, labelText){
  let level = config[rule];
  if(isNaN(level)){
    level = 0
  }
  let humanizedType = type.charAt(0).toUpperCase() + type.slice(1);
  let message = buildMessage(rule, `${humanizedType} Control`, labelText);
  switch(level){
    case 0:
      throw new Error(message)
    case 1:
      //eslint-disable-next-line no-console
      console.warn(message)
    }
}
