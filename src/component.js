import { Component } from 'preact';
import getName from './name';

const fromComponent = (ComponentClass, name = ComponentClass.name) => {
  const measure = getName(name);
  const willReceiveProps = ComponentClass.prototype.componentWillReceiveProps;
  const componentDidUpdate = ComponentClass.prototype.componentDidUpdate;

  ComponentClass.prototype.componentWillReceiveProps = function (...args) {
    performance.mark(measure(args[0]) + ':start');
    if (willReceiveProps)
      return willReceiveProps.apply(this, args);
  };

  ComponentClass.prototype.componentDidUpdate = function (...args) {
    let result;
    if (componentDidUpdate)
      result = componentDidUpdate.apply(this, args);
    const measureName = measure(this.props);
    performance.mark(`${measureName}:end`);
    performance.measure(measureName, `${measureName}:start`, `${measureName}:end`);
    return result;
  };

  return ComponentClass;
};

export default fromComponent;
