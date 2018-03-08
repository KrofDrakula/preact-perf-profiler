import test from 'ava';
import { getName } from '../src/name';

test('getName should return the string if a string is passed', t => {
  t.plan(1);
  const measure = getName('simpleName');
  t.is(measure({}), 'simpleName');
});
