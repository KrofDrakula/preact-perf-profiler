import fromComponent from './component';
import fromFunction from './function';
import { isClass } from './isClass';

const withProfiler = (Wrapped, name, options) =>
  isClass(Wrapped)
    ? fromComponent(Wrapped, name, options)
    : fromFunction(Wrapped, name, options);

export default withProfiler;
