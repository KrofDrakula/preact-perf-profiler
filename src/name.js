const getName = name => props =>
  typeof name == 'function' ?
    name(props) :
    name.toString();

export default getName;
