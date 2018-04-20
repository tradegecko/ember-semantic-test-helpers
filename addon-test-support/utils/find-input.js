import { findAll } from "@ember/test-helpers";

export default async function findInput(label) {
  let element = await findLabel(label);

  if (!element) {
    throw Error(`Can't find label ${label}`);
  }
  let input = await findControl(label, element);
  if (!input) {
    throw Error(`Can't find input for ${label}`);
  }
  if (!input.attributes) {
    throw Error(`Can't find input attributes for ${label}`);
  }
  let inputType = await findInputType(input);

  return {
    input,
    inputType,
  };
}

function findLabel(text) {
  let label = findAll('label').find( label => { return label.innerText === text });
  if(!label){
    return findAll('[aria-label]').find( control => {
      return control.attributes['aria-label'].value === text
    });
  }
}

function findControl(label, element) {
  if(element.attributes['aria-label']){
    return element;
  }
  let targetControl = element.attributes['for'];
  if (!targetControl) {
    throw new Error(`${label} does not have a for attribute`);
  }
  let input = element.control || $(`#${element.attributes['for'].value}`)[0];
  if (!input) {
    throw (`could not find input labeled ${label}`);
  }
  return input;
}

function findInputType(input) {
  let inputType = null;
  if ($(input).find('.tg-unit-field').length) {
    return 'unit-field';
  }
  if ($(input).find('.ember-power-select').length) {
    return 'ember-power-select';
  }
  if ($(input).find('.selectize-dropdown-content').length) {
    return 'selectize';
  }
  return inputType;
}
