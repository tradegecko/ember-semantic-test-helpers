import {default as config, errors, buildMessage } from './config';

export default function(rule,  type, labelText){
  let level = config[rule];
  let message = buildMessage(rule, type, labelText);
  switch(level){
    case 0:
      throw new errors[rule](message);
    case 1:
      //eslint-disable-next-line no-console
      console.warn(message)
    }
}
