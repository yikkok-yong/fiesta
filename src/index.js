#! /usr/bin/env node

import program from "commander";
import path from "path";

import { generateComponent, generateTest } from "./helper";
import { component, pure_component, test } from "./templates/index";

const curDir = "./";
const types = ["component", "test"];

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

    switch (index) {
      case 0:
        if (program.pure) {
          generateComponent(pure_component, name);
          return;
        }

        generateComponent(component, name);
        break;
      case 1:
        generateTest(test, name);
        break;
      default:
        break;
    }
  })
  .parse(process.argv);
