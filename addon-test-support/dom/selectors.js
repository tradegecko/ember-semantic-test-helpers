import { button, input, toggle, select } from './types';

export let buttonQuery = button.join(',');
export let inputQuery  = input.join(',');
export let toggleQuery = toggle.join(',');
export let selectQuery = select.join(',');
export let formControlQuery = [inputQuery, toggleQuery, selectQuery].join(',');
