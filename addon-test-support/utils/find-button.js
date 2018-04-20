import { findAll } from '@ember/test-helpers';

export default function findButton(text) {
  let selector = 'button,a[href],[role="button"]';
  return findAll(selector).find(matches(text.toLowerCase()));
}

function matches(text) {
  return element => matchesInnerText(element, text) ||
                    matchesTitle(element, text) ||
                    matchesAriaLabel(element, text);
}

function matchesInnerText(element, text) {
  return element.innerText.toLowerCase().includes(text);
}

function matchesTitle(element, text) {
  return element.title && element.title.toLowerCase().includes(text);
}

function matchesAriaLabel(element, text) {
  let ariaLabel = element.getAttribute('aria-label');
  return ariaLabel && ariaLabel.toLowerCase().includes(text);
}
