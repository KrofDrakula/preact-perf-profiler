import test from 'ava';
import { h, render, Component } from 'preact';
import sinon from 'sinon';
import undom from 'undom';
import fromComponent from '../src/component';

const _performance = global.performance;

test.beforeEach(() => {
  global.performance = {
    mark: sinon.spy(),
    measure: sinon.spy()
  };
  global.document = undom();
});

test.afterEach(() => {
  global.performance = _performance;
  delete global.document;
});

test('should work with a bare class component and adopt class name', t => {
  class A extends Component {
    render({ myProp }) {
      return <p>{myProp}</p>;
    }
  }

  const B = fromComponent(A);
  const rendered = render(<B myProp="Yay!" />, document.body);
  t.true(Component.isPrototypeOf(B), 'Wrapped component is a Preact component');

  t.is(rendered.nodeName, 'P');
  t.is(rendered.childNodes[0].nodeValue, 'Yay!', 'passes through rendered JSX');

  t.is(
    performance.mark.callCount,
    2,
    'should have created start and end marks'
  );
  t.is(performance.measure.callCount, 1, 'should have created one measure');

  t.is(
    performance.mark.getCall(0).args[0],
    '1:A:start',
    'marked start of initial render'
  );
  t.is(
    performance.mark.getCall(1).args[0],
    '1:A:end',
    'marked end of initial render'
  );
  t.deepEqual(
    performance.measure.getCall(0).args,
    ['A', '1:A:start', '1:A:end'],
    'measure name is equal to wrapped class name'
  );
});

test('should work with a bare class on re-render', t => {
  class A extends Component {
    render({ myProp }) {
      return <p>{myProp}</p>;
    }
  }

  const B = fromComponent(A);
  let rendered = render(<B myProp="Yay!" />, document.body);
  rendered = render(<B myProp="Woop!" />, document.body, rendered);

  t.is(rendered.childNodes[0].nodeValue, 'Woop!', 'should have rerendered');

  t.is(
    performance.mark.getCall(2).args[0],
    '2:A:start',
    'should increment start mark ids'
  );
  t.is(
    performance.mark.getCall(3).args[0],
    '2:A:end',
    'should increment end mark ids'
  );
  t.deepEqual(
    performance.measure.getCall(1).args,
    ['A', '2:A:start', '2:A:end'],
    'should have created measure with same name, other marks'
  );
});
