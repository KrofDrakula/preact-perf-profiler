export const isClass = X =>
  typeof X == 'function' &&
  typeof X.prototype != 'undefined' &&
  typeof X.prototype.render != 'undefined';
