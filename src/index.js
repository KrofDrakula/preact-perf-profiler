import { Component } from 'preact';
import fromComponent from './component';
import fromFunction from './function';

const withProfiler = (Wrapped, name, options) =>
  Component.isPrototypeOf(Wrapped)
    ? fromComponent(Wrapped, name, options)
    : fromFunction(Wrapped, name, options);

export default withProfiler;
