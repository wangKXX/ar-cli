const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora("Loading undead unicorns");
const utils = require("../utils");

module.exports = function(appName, isInstall) {
  spinner.start("project init....");
  download(
    "direct:https://github.com/wangKXX/template/archive/refs/heads/main.zip",
    appName,
    function(err) {
      if (err) {
        spinner.fail(chalk.red("download failed \n" + err));
        process.exit();
      }
      spinner.info(chalk.green(`download sucess`));
      if (isInstall) {
        utils.npmInstall(appName);
      }
    }
  );
};
