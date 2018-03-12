import undom from 'undom';
import sinon from 'sinon';

export const createPerfApi = () => ({
  mark: sinon.spy(),
  measure: sinon.spy()
});

export const createGlobals = () =>
  global.document = undom();

export const resetGlobals = () => delete global.document;

export const getId = mark => mark.split(':')[0];
