import { createMeasure, getStartMark, getEndMark } from './name';

const fromComponent = (ComponentClass, name = ComponentClass.name) => {
  const measure = createMeasure(name);
  const proto = ComponentClass.prototype;

  const componentWillMount = proto.componentWillMount;
  const componentDidMount = proto.componentDidMount;
  const willReceiveProps = proto.componentWillReceiveProps;
  const componentDidUpdate = proto.componentDidUpdate;

  proto.componentWillMount = function(...args) {
    this.__measureId = 1;
    performance.mark(
      getStartMark(this.__measureId, measure, this.props, this.state)
    );
    if (componentWillMount) return componentWillMount.apply(this, args);
  };

  proto.componentWillReceiveProps = function(...args) {
    this.__measureId++;
    performance.mark(getStartMark(this.__measureId, measure, ...args));
    if (willReceiveProps) return willReceiveProps.apply(this, args);
  };

  proto.componentDidMount = function(...args) {
    performance.mark(getEndMark(this.__measureId, measure, ...args));
    if (componentDidMount) return componentDidMount.apply(this, args);
  };

  proto.componentDidUpdate = function(...args) {
    let result;
    if (componentDidUpdate) result = componentDidUpdate.apply(this, args);
    const endMeasureName = getEndMark(
      this.__measureId,
      measure,
      this.props,
      this.state
    );
    performance.mark(endMeasureName);
    performance.measure(
      measure(this.props, this.state),
      getStartMark(this.__measureId, measure, this.props, this.state),
      endMeasureName
    );
    return result;
  };

  return ComponentClass;
};

export default fromComponent;
