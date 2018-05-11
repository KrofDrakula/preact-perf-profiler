export const createMeasure = name => (...args) =>
  typeof name == 'function' ? name(...args) : name.toString();

export const getStartMark = (id, measureName, ...args) =>
  `'\u269B' ${id}:${measureName(...args)}:start`;

export const getEndMark = (id, measureName, ...args) =>
  `'\u269B' ${id}:${measureName(...args)}:end`;
