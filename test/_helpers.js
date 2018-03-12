import undom from 'undom';
import sinon from 'sinon';

const _performance = global.performance;

export const createGlobals = () => {
  global.performance = { mark: sinon.spy(), measure: sinon.spy() };
  global.document = undom();
};

export const resetGlobals = () => {
  global.performance = _performance;
  delete global.document;
};

export const getId = mark => mark.split(':')[0];