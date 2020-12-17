#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package");
const chalk = require("chalk");
const inquirer = require("inquirer");
const downlodaVue = require("../template/vue-template");
const downlodaReact = require("../template/react-template");
const util = require("../utils");
const fs = require("fs");

const templateMap = {
  vue: downlodaVue,
  react: downlodaReact
};

program.version(chalk.green(`${pkg.version}`));

program
  .command("init <app-name>")
  .description("generate a project from a remote template")
  .option("-c, --clone", "Use git clone when fetching remote template")
  .action((template, appName, cmd) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "select",
          message: "please select vue or react that you want",
          choices: ["vue", "react"]
        }
      ])
      .then(({ select }) => {
        const lowSelect = select.toLocaleLowerCase();
        inputFolderName(lowSelect, template);
      });
  });

function inputFolderName(type, folderName) {
  if (!util.isFileExist(folderName)) {
    templateMap[type](folderName);
  } else {
    console.log(chalk.red("folder is existed!"));
    inquirer
    .prompt([
      {
        type: "input",
        name: "forlderName",
        message: `please input a new folder name: `
      }
    ])
    .then(({ forlderName }) => {
      inputFolderName(type, forlderName)
    });
  }
}

// function reNameFolder(folerName, newFolderName, callback) {
//   fs.rename(folerName, newFolderName, function (err) {
//     if (!err) {
//       callback();
//     }
//     console.log(chalk.red("delete folder failed" + err));
//   });
// }

// function replaceExisedFloder(template, callback) {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "select",
//         message: `A folder named '${template}' already exists under the current folder. Please select your action`,
//         choices: ["Delete existing folder?", "End"]
//       }
//     ])
//     .then(({ select }) => {
//       if (select !== "End") {
//         reNameFolder(template, callback);
//       }
//     });
// }

program.parse(process.argv);
