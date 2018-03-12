import { createMeasure, getStartMark, getEndMark } from './name';

const fromComponent = (ComponentClass, name = ComponentClass.name, { performance } = {}) => {
  if (!performance) {
    if (typeof window != 'undefined' && window.performance)
      performance = window.performance;
    else if (typeof global != 'undefined' && global.performance)
      performance = global.performance;
    else
      throw new Error('No global performance API found, none provided!');
  }

  const measure = createMeasure(name);
  const proto = ComponentClass.prototype;

  const componentWillMount = proto.componentWillMount;
  const componentDidMount = proto.componentDidMount;
  const willReceiveProps = proto.componentWillReceiveProps;
  const componentDidUpdate = proto.componentDidUpdate;

  proto.componentWillMount = function (...args) {
    this.__perfId = Math.random().toString(16).slice(2);
    performance.mark(getStartMark(this.__perfId, measure, this.props, this.state));
    if (componentWillMount) return componentWillMount.apply(this, args);
  };

  proto.componentDidMount = function (...args) {
    let result;
    if (componentDidMount) result = componentDidMount.apply(this, args);
    const endMarkName = getEndMark(this.__perfId, measure, this.props, this.state);
    performance.mark(endMarkName);
    performance.measure(
      measure(this.props, this.state),
      getStartMark(this.__perfId, measure, this.props, this.state),
      endMarkName
    );
    return result;
  };

  proto.componentWillReceiveProps = function (...args) {
    this.__perfId = Math.random().toString(16).slice(2);
    const [nextProps, nextState] = args;
    performance.mark(getStartMark(this.__perfId, measure, nextProps, nextState));
    if (willReceiveProps) return willReceiveProps.apply(this, args);
  };

  proto.componentDidUpdate = function (...args) {
    let result;
    if (componentDidUpdate) result = componentDidUpdate.apply(this, args);
    const endMarkName = getEndMark(this.__perfId, measure, this.props, this.state);
    performance.mark(endMarkName);
    performance.measure(
      measure(this.props, this.state),
      getStartMark(this.__perfId, measure, this.props, this.state),
      endMarkName
    );
    return result;
  };

  return ComponentClass;
};

export default fromComponent;
