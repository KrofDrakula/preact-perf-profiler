import test from 'ava';
import { h, render, options, Component } from 'preact';
import { createGlobals, resetGlobals, createPerfApi } from './_helpers';
import fromFunction from '../src/function';

test.before(() => options.debounceRendering = fn => fn());

test.after(() => delete options.debounceRendering);

test.beforeEach(createGlobals);

test.afterEach(resetGlobals);

test('wrapping a PFC should create a component', t => {
  const performance = createPerfApi();
  const MyComponent = () => <div>Hello</div>;
  const Wrapped = fromFunction(MyComponent, undefined, { performance });
  t.true(Component.isPrototypeOf(Wrapped), 'should create subclass of Component');
});

test('PFC should create measures based on function name', t => {
  const performance = createPerfApi();
  const MyComponent = () => <div>Hello</div>;
  const B = fromFunction(MyComponent, undefined, { performance });
  render(<B/>, document.body);
  t.is(performance.measure.callCount, 1, 'one measure per render');
  t.is(performance.measure.getCall(0).args[0], 'MyComponent');
});

test('PFC should create measures based on passed function', t => {
  const performance = createPerfApi();
  const MyComponent = () => <div>Hello</div>;
  const B = fromFunction(
    MyComponent,
    ({ p }) => `Component(prop=${p})`,
    { performance }
  );
  render(<B p="test"/>, document.body);
  t.is(performance.measure.callCount, 1, 'one measure per render');
  t.is(performance.measure.getCall(0).args[0], 'Component(prop=test)');
});
