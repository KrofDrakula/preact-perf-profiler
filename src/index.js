import { Component } from 'preact';
import fromComponent from './component';
import fromFunction from './function';

const withProfiler = (Wrapped, name) =>
  Component.isPrototypeOf(Wrapped)
    ? fromComponent(Wrapped, name)
    : fromFunction(Wrapped, name);

export default withProfiler;
