import test from 'ava';
import sinon from 'sinon';
import { createMeasure, getStartMark, getEndMark } from '../src/name';

const exampleNameFunction = ({ a }, { b }) => `a = ${a}, b = ${b}`;

test('create measure from string', t => {
  t.plan(1);
  const measure = createMeasure('simpleName');
  t.is(measure({}), 'simpleName');
});

test('create measure from function', t => {
  t.plan(2);
  const mock = sinon.spy(exampleNameFunction);
  const measure = createMeasure(mock);
  t.is(measure({ a: 'A' }, { b: 'B' }), 'a = A, b = B');
  t.true(mock.firstCall.calledWith({ a: 'A' }, { b: 'B' }));
});

test('generate correct start mark given measure', t => {
  t.plan(1);
  const measure = createMeasure('ExampleComponent');
  t.is(getStartMark(10, measure), '\u269B 10:ExampleComponent:start');
});

test('generate correct end mark given measure', t => {
  t.plan(1);
  const measure = createMeasure('ExampleComponent');
  t.is(getEndMark(25, measure), '\u269B 25:ExampleComponent:end');
});
