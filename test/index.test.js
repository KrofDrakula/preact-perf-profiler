import test from 'ava';
import { createPerfApi } from './_helpers';
import { h, Component } from 'preact';
import withProfiler, { isClass } from '../src/index';

test('isClass should distinguish between pure function and component class', t => {
  t.true(isClass(class extends Component {}));
  t.true(
    isClass(
      class {
        render() {
          return null;
        }
      }
    )
  );
  t.false(isClass(() => {}));
  t.false(isClass(function A() {}));
});

test('withProfiler should work with both PFCs and component classes', t => {
  // construct a PFC
  withProfiler(() => null, undefined, { performance: createPerfApi() });
  // construct a React-like component
  withProfiler(class extends Component {}, undefined, {
    performance: createPerfApi()
  });
  // create a classically inherited component
  const C = function C() {};
  C.prototype = Object.create(Component.prototype);
  C.prototype.constructor = C;
  withProfiler(C, undefined, { performance: createPerfApi() });
  t.pass();
});
