export let component = `/* @flow */

import React, { Component } from "react";

type Props = {};
export default class <%className%> extends Component<Props> {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return null;
  }
}
`;

export let pure_component = `/* @flow */

import React, { PureComponent } from "react";

type Props = {};
export default class <%className%> extends PureComponent<Props> {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return null;
  }
}
`;

export let style = `import { StyleSheet } from "react-native";

const style = StyleSheet.create({

})

export default style;
`;

export let test = `

describe("TEST - ", () => {
  it("", async () => {});
});
`;
