import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { configure } from 'semantic-dom-selectors';

configure({
  preset: 'default',
  rootElementSelector: 'ember-testing'
});

setApplication(Application.create(config.APP));

start();
