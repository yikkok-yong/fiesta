#! /usr/bin/env node

import program from "commander";
import { selectsComponent } from "./helper";

const curDir = "./";
const types = ["component"];

program
  .arguments("[type] [part]")
  .option("-p, --pure", "Generate a extended PureComponent")
  .action((type, name) => {
    const index = types.findIndex(element => {
      return type === element;
    });

    if (index === -1) {
      console.log(
        "Please define a type to generate, currently support: \n * component \n * test"
      );
      console.log("eg, \n generate component [filename]");

      return;
    }

    if (!name) {
      console.log("Path or file name is required.");
      return;
    }

    if (program.pure) {
      selectsComponent(name, "pure");
      return;
    }

    selectsComponent(name);
  })
  .parse(process.argv);
