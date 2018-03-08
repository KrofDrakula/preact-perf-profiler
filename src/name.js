export const getName = name => (...args) =>
  typeof name == 'function' ? name(...args) : name.toString();

export const getStartMark = (id, measureName, ...args) =>
  `${id}:${measureName(...args)}:start`;

export const getEndMark = (id, measureName, ...args) =>
  `${id}:${measureName(...args)}:end`;
