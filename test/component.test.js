import test from 'ava';
import { h, render, Component } from 'preact';
import sinon from 'sinon';
import undom from 'undom';
import fromComponent from '../src/component';

test('should work with a bare class component and adopt class name', t => {
  t.plan(3);
  class A extends Component {
    render({ myProp }) {
      return <p>{myProp}</p>;
    }
  }

  const B = fromComponent(A);

  t.true(Component.isPrototypeOf(B));

  global.performance = sinon.mock({
    mark: () => {},
    measure: () => {}
  });

  const document = undom();

  //const rendered = render(<B myProp="Yay!" />, document.body);

  //t.is(rendered.nodeName, 'P');
});
