"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalizeFirstChar = exports.generateComponent = exports.selectsComponent = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _index = require("./templates/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SYSTEM_OS = _os.default.platform();

var delimiter = SYSTEM_OS.match(/(darwin|linux)/) ? "/" : "\\";
var componentDefaultPath = "src/components";

var selectsComponent = function selectsComponent(to) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var componentPart = _index.component;

  switch (option) {
    case "pure":
      componentPart = _index.pure_component;
      break;

    default:
      componentPart = _index.component;
      break;
  }

  generateComponent(componentPart, to);
};

exports.selectsComponent = selectsComponent;

var generateComponent = function generateComponent(from, to) {
  var paths = to.split(delimiter);
  var file = paths[paths.length - 1];
  var className = file.replace(/^\w/, capitalizeFirstChar);
  to = "".concat(componentDefaultPath, "/").concat(to);

  _shelljs.default.mkdir("-p", to);

  _shelljs.default.chmod("-R", 755, to);

  to += "/" + file;

  var isExist = _fs.default.existsSync("".concat(to, ".js"));

  if (isExist) {
    console.log("Component exists.");
  } else {
    from = from.replace("<%className%>", className);
    process.umask(0);

    _fs.default.writeFile("".concat(to, ".js"), from, {
      encoding: "utf-8",
      mode: "644"
    }, function (error) {
      if (error) {
        console.log(error.message);
        return;
      }

      console.log("CREATE ".concat(to, ".js"));
    });

    _fs.default.writeFile("".concat(to, ".style.js"), _index.style, {
      encoding: "utf-8",
      mode: "644"
    }, function (error) {
      if (error) {
        console.log(error.message);
        return;
      }

      console.log("CREATE ".concat(to, ".style.js"));
    });
  }
};

exports.generateComponent = generateComponent;

var capitalizeFirstChar = function capitalizeFirstChar(char) {
  return char.toUpperCase();
};

exports.capitalizeFirstChar = capitalizeFirstChar;