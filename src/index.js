import fromComponent from './component';
import fromFunction from './function';

export const isClass = X =>
  typeof X == 'function' &&
  typeof X.prototype != 'undefined' &&
  typeof X.prototype.render != 'undefined';

const withProfiler = (Wrapped, name, options) =>
  isClass(Wrapped)
    ? fromComponent(Wrapped, name, options)
    : fromFunction(Wrapped, name, options);

export default withProfiler;
