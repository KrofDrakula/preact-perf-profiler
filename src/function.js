import { Component } from 'preact';
import { createMeasure, getStartMark, getEndMark } from './name';

const fromFunction = (PureFunction, name = PureFunction.name) => {
  const measure = createMeasure(name);

  return class PerfComponent extends Component {
    componentWillMount() {
      this.__measureId = 1;
      performance.mark(getStartMark(this.__measureId, measure, this.props));
    }

    componentWillReceiveProps(nextProps) {
      performance.mark(getStartMark(this.__measureId, measure, nextProps));
    }

    componentDidMount() {
      performance.mark(getEndMark(this.__measureId, measure, this.props));
    }

    componentDidUpdate() {
      const endMeasureName = getEndMark(this.__measureId, measure, this.props);
      performance.mark(endMeasureName);
      performance.measure(
        measure(this.props),
        `${this.__measureId}:${measure(this.props)}:start`,
        endMeasureName
      );
    }

    render(props) {
      return PureFunction(props);
    }
  };
};

export default fromFunction;
