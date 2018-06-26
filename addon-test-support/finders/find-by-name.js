import findAll from './helpers/findAll';

export default {
  run: findByName,
  key: 'perceivedByName',
  errorText: function(type, labelText){
    return `Control ${labelText} found through input name attribute`;
  }
}

function findByName(selector, text) {
  let elements = selector.split(',');
  return findAll(elements.join(`[name="${text}"],`)+`[name="${text}"]`);
}
