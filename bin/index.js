#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package");
const chalk = require("chalk");
const inquirer = require('inquirer');
const downlodaVue = require("../template/vue-template");
const downlodaReact = require("../template/react-template");

const templateMap = {
  vue: downlodaVue,
  react: downlodaReact
}

program.version(chalk.green(`${pkg.version}`));

program
  .command("init <app-name>")
  .description(
    "generate a project from a remote template"
  )
  .option("-c, --clone", "Use git clone when fetching remote template")
  .action((template, appName, cmd) => {
    inquirer.prompt([{
      type: "list",
      name: "select",
      message: "please select vue or react that you want",
      choices: [
        "vue",
        "react",
      ]
    }]).then(({ select }) => {
      const lowSelect = select.toLocaleLowerCase();
      templateMap[lowSelect](appName);
    });
  });



program.parse(process.argv);
