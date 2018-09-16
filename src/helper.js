import fs from "fs";
import os from "os";
import path from "path";
import shell from "shelljs";
import { style } from "./templates/index";

const SYSTEM_OS = os.platform();
const delimiter = SYSTEM_OS.match(/(darwin|linux)/) ? "/" : "\\";
const opt = {
  components: "src/components",
  tests: { rootDir: "e2e", testFilePattern: "*.spec.js" }
};

export let generateComponent = (from, to) => {
  const paths = to.split(delimiter);
  const file = paths[paths.length - 1];
  const className = file.replace(/^\w/, capitalizeFirstChar);

  mergeOptions();

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
    writeFile(to, from, {});
    writeFile(to, style, { postfix: ".style.js" });
  }
};

export let generateTest = (from, to) => {
  const paths = to.split(delimiter);
  const file = paths[paths.length - 1];

  if (paths && paths.length > 1) {
    to = `${opt.tests.rootDir}/${to}`;

    shell.mkdir("-p", to);
    shell.chmod("-R", 755, to);
  } else {
    if (!fs.existsSync(opt.tests.rootDir)) {
      shell.mkdir(opt.tests.rootDir);
    }

    mergeOptions();

    const numberOfTestFiles = shell.ls(
      `${opt.tests.rootDir}/${opt.tests.testFilePattern}`
    );

    to = `${opt.tests.rootDir}/${numberOfTestFiles.length + 1}_${file}`;
  }

  const isExist = fs.existsSync(`${to}.spec.js`);
  isFileExist(isExist, "Test file exists.");

  process.umask(0);
  writeFile(to, from, { postfix: ".spec.js" });
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

let writeFile = (to, content, { postfix = ".js" }) => {
  fs.writeFile(
    `${to}${postfix}`,
    content,
    { encoding: "utf-8", mode: "644" },
    error => {
      if (error) {
        console.log(error.message);
        return;
      }
      console.log(`CREATE ${to}${postfix}`);
    }
  );
};

let isFileExist = (isExist, warning) => {
  if (isExist) {
    console.log(warning);
    shell.exit(0);
  }
};

let mergeOptions = () => {
  const hasOpt = getOption();
  if (hasOpt) {
    Object.assign(opt, hasOpt);
  }
};
