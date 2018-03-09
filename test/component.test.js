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

const getId = mark => mark.split(':')[0];

test.serial('should work with a bare class component and adopt class name', t => {
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

  t.true(
    performance.mark.getCall(0).args[0].endsWith(':A:start'),
    'marked start of initial render'
  );

  t.true(
    performance.mark.getCall(1).args[0].endsWith(':A:end'),
    'marked end of initial render'
  );

  t.is(
    performance.measure.getCall(0).args[0],
    'A',
    'measure name is equal to wrapped class name'
  );
});

test.serial('should work with a bare class on re-render', t => {
  class A extends Component {
    render({ myProp }) {
      return <p>{myProp}</p>;
    }
  }

  const B = fromComponent(A);
  let rendered = render(<B myProp="Yay!" />, document.body);
  rendered = render(<B myProp="Woop!" />, document.body, rendered);

  t.is(rendered.childNodes[0].nodeValue, 'Woop!', 'should have rerendered');

  t.is(performance.mark.callCount, 4, 'should have made 4 marks');
  t.is(performance.measure.callCount, 2, 'should have made 2 measures');

  t.is(
    getId(performance.mark.getCall(0).args[0]),
    getId(performance.mark.getCall(1).args[0]),
    'should generate matching ids for paired calls'
  );

  t.is(
    getId(performance.mark.getCall(2).args[0]),
    getId(performance.mark.getCall(3).args[0]),
    'should generate matching ids for paired calls'
  );

  const firstId = getId(performance.mark.getCall(0).args[0]);
  const secondId = getId(performance.mark.getCall(2).args[0]);

  t.not(
    firstId,
    secondId,
    'ids should not match for two different measurements'
  );

  t.is(performance.measure.callCount, 2);

  t.is(
    performance.measure.getCall(0).args[0],
    performance.measure.getCall(1).args[0],
    'measures should be the same between renders'
  );
});
