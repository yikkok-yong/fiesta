import fs from "fs";
import os from "os";
import path from "path";
import shell from "shelljs";
import { component, pure_component, style } from "./templates/index";

const SYSTEM_OS = os.platform();
const delimiter = SYSTEM_OS.match(/(darwin|linux)/) ? "/" : "\\";
const opt = {
  components: "src/components"
};

export let selectsComponent = (to, option = undefined) => {
  let componentPart = component;

  switch (option) {
    case "pure":
      componentPart = pure_component;
      break;
    default:
      componentPart = component;
      break;
  }
  generateComponent(componentPart, to);
};

export let generateComponent = (from, to) => {
  const paths = to.split(delimiter);
  const file = paths[paths.length - 1];
  const className = file.replace(/^\w/, capitalizeFirstChar);

  const hasOpt = getOption();
  if (hasOpt) {
    Object.assign(opt, hasOpt);
  }

  to = `${opt.components}/${to}`;

  shell.mkdir("-p", to);
  shell.chmod("-R", 755, to);

  to += "/" + file;

  const isExist = fs.existsSync(`${to}.js`);

  if (isExist) {
    console.log("Component exists.");
  } else {
    from = from.replace("<%className%>", className);
    process.umask(0);
    fs.writeFile(
      `${to}.js`,
      from,
      { encoding: "utf-8", mode: "644" },
      error => {
        if (error) {
          console.log(error.message);
          return;
        }
        console.log(`CREATE ${to}.js`);
      }
    );

    fs.writeFile(
      `${to}.style.js`,
      style,
      { encoding: "utf-8", mode: "644" },
      error => {
        if (error) {
          console.log(error.message);
          return;
        }
        console.log(`CREATE ${to}.style.js`);
      }
    );
  }
};

export let capitalizeFirstChar = char => {
  return char.toUpperCase();
};

export let getOption = () => {
  if (fs.existsSync(path.resolve("package.json"))) {
    const fiestaOpt = require(path.resolve("package.json")).fiesta;

    if (fiestaOpt) {
      return fiestaOpt;
    }
  }
};
