import { Component } from 'preact';
import { createMeasure, getStartMark, getEndMark } from './name';

const fromFunction = (PureFunction, name = PureFunction.name, { performance } = {}) => {
  if (!performance) {
    if (typeof window != 'undefined' && window.performance)
      performance = window.performance;
    else if (typeof global != 'undefined' && global.performance)
      performance = global.performance;
    else
      throw new Error('No global performance API found, none provided!');
  }

  const measure = createMeasure(name);

  return class PerfComponent extends Component {
    componentWillMount() {
      this.__perfId = Math.random().toString(16).slice(2);
      performance.mark(getStartMark(this.__perfId, measure, this.props));
    }

    componentDidMount() {
      const endMarkName = getEndMark(this.__perfId, measure, this.props);
      performance.mark(endMarkName);
      performance.measure(
        measure(this.props),
        getStartMark(this.__perfId, measure, this.props),
        endMarkName
      );
    }

    componentWillReceiveProps(nextProps) {
      this.__perfId = Math.random().toString(16).slice(2);
      performance.mark(getStartMark(this.__perfId, measure, nextProps));
    }

    componentDidUpdate() {
      const endMarkName = getEndMark(this.__perfId, measure, this.props);
      performance.mark(endMarkName);
      performance.measure(
        measure(this.props),
        getStartMark(this.__perfId, measure, this.props),
        endMarkName
      );
    }

    render(props) {
      return PureFunction(props);
    }
  };
};

export default fromFunction;
