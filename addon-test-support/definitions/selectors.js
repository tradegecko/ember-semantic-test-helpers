import { button, text, toggle, select } from './types';

export let buttonQuery = button.join(',');
export let textQuery  = text.join(',');
export let toggleQuery = toggle.join(',');
export let selectQuery = select.join(',');
export let formControlQuery = [textQuery, toggleQuery, selectQuery].join(',');
