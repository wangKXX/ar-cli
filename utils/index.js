const fs = require("fs");
const { exec } = require('child_process');
const ora = require("ora");
const spinner = ora("Loading undead unicorns");
const chalk = require("chalk");

module.exports = {
  isFileExist: function(file) {
    return fs.existsSync(file);
  },
  npmInstall:function(appName) {
    spinner.start("npm install...");
    const execProcess = `cd ${appName} && npm install`;
    exec(execProcess, function (error, stdout, stderr) {
      if (error) {
        spinner.fail(chalk.red("npm install failed\n" + error));
        process.exit();
      } else {
        spinner.succeed(chalk.green(`\n sucessfully installed\n cd ${appName} \n npm run serve \n`));
      }
    });
  }
}