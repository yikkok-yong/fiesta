"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = exports.pure_component = exports.component = void 0;
var component = "/* @flow */\n\nimport React, { Component } from \"react\";\n\ntype Props = {};\nexport default class <%className%> extends Component<Props> {\n  shouldComponentUpdate(nextProps, nextState) {\n    return true;\n  }\n\n  componentDidMount() {}\n\n  componentWillUnmount() {}\n\n  render() {\n    return null;\n  }\n}\n";
exports.component = component;
var pure_component = "/* @flow */\n\nimport React, { PureComponent } from \"react\";\n\ntype Props = {};\nexport default class <%className%> extends PureComponent<Props> {\n  componentDidMount() {}\n\n  componentWillUnmount() {}\n\n  render() {\n    return null;\n  }\n}\n";
exports.pure_component = pure_component;
var style = "import { StyleSheet } from \"react-native\";\n\nconst style = StyleSheet.create({\n\n})\n\nexport default style;\n";
exports.style = style;