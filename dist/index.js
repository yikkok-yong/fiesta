#! /usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _helper = require("./helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var curDir = "./";
var types = ["component"];

_commander.default.arguments("[type] [part]").option("-p, --pure", "Generate a extended PureComponent").action(function (type, name) {
  var index = types.findIndex(function (element) {
    return type === element;
  });

  if (index === -1) {
    console.log("Please define a type to generate, currently support: \n * component \n * test");
    console.log("eg, \n generate component [filename]");
    return;
  }

  if (!name) {
    console.log("Path or file name is required.");
    return;
  }

  if (_commander.default.pure) {
    (0, _helper.selectsComponent)(name, "pure");
    return;
  }

  (0, _helper.selectsComponent)(name);
}).parse(process.argv);