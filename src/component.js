import { createMeasure, getStartMark, getEndMark } from './name';

const fromComponent = (ComponentClass, name = ComponentClass.name) => {
  const measure = createMeasure(name);
  const proto = ComponentClass.prototype;

  const componentWillMount = proto.componentWillMount;
  const componentDidMount = proto.componentDidMount;
  const willReceiveProps = proto.componentWillReceiveProps;
  const componentDidUpdate = proto.componentDidUpdate;

  proto.componentWillMount = function(...args) {
    this.__id = 1;
    performance.mark(getStartMark(this.__id, measure, this.props, this.state));
    if (componentWillMount) return componentWillMount.apply(this, args);
  };

  proto.componentWillReceiveProps = function(...args) {
    this.__id++;
    performance.mark(getStartMark(this.__id, measure, ...args));
    if (willReceiveProps) return willReceiveProps.apply(this, args);
  };

  proto.componentDidMount = function(...args) {
    let result;
    if (componentDidMount) result = componentDidMount.apply(this, args);
    const endMarkName = getEndMark(this.__id, measure, ...args);
    performance.mark(endMarkName);
    performance.measure(
      measure(this.props, this.state),
      getStartMark(this.__id, measure, this.props, this.state),
      endMarkName
    );
    return result;
  };

  proto.componentDidUpdate = function(...args) {
    let result;
    if (componentDidUpdate) result = componentDidUpdate.apply(this, args);
    const endMarkName = getEndMark(this.__id, measure, this.props, this.state);
    performance.mark(endMarkName);
    performance.measure(
      measure(this.props, this.state),
      getStartMark(this.__id, measure, this.props, this.state),
      endMarkName
    );
    return result;
  };

  return ComponentClass;
};

export default fromComponent;
