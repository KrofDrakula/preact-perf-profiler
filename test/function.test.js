import test from 'ava';
import { h, render, options, Component } from 'preact';
import { createGlobals, resetGlobals } from './_helpers';
import fromFunction from '../src/function';

test.before(() => options.debounceRendering = fn => fn());

test.after(() => delete options.debounceRendering);

test('wrapping a PFC should create a component', t => {
  const MyComponent = () => <div>Hello</div>;
  const Wrapped = fromFunction(MyComponent);
  t.true(Component.isPrototypeOf(Wrapped), 'should create subclass of Component');
});

test('PFC should create measures based on function name', t => {
  createGlobals();
  const MyComponent = () => <div>Hello</div>;
  const B = fromFunction(MyComponent);
  render(<B/>, document.body);
  t.is(performance.measure.callCount, 1, 'one measure per render');
  t.is(performance.measure.getCall(0).args[0], 'MyComponent');
  resetGlobals();
});

test('PFC should create measures based on passed function', t => {
  createGlobals();
  const MyComponent = () => <div>Hello</div>;
  const B = fromFunction(MyComponent, ({ p }) => `Component(prop=${p})`);
  render(<B p="test"/>, document.body);
  t.is(performance.measure.callCount, 1, 'one measure per render');
  t.is(performance.measure.getCall(0).args[0], 'Component(prop=test)');
  resetGlobals();
});