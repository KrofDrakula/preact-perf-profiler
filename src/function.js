import { Component } from 'preact';
import getName from './name';

const fromFunction = (PureFunction, name = PureFunction.name) => {
  const measure = getName(name);

  return class PerfComponent extends Component {
    componentWillReceiveProps(nextProps) {
      performance.mark(`${measure(nextProps)}:start`);
    }
    componentDidUpdate() {
      const measureName = measure(this.props);
      performance.mark(`${measureName}:end`);
      performance.measure(measureName, `${measureName}:start`, `${measureName}:end`);
    }
    render(props) {
      return PureFunction(props);
    }
  };
};

export default fromFunction;
