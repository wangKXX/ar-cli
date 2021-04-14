const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora("Loading undead unicorns");
const utils = require("../utils");

module.exports = (appName, isInstall) => {
  spinner.start("project init....");
  download(
    "https://github.com/wangKXX/template.git",
    appName,
    { clone: true },
    err => {
      if (err) {
        spinner.fail(chalk.red("下载失败 \n" + err));
        process.exit();
      }
      spinner.succeed(chalk.green(`下载成功`));
      if (isInstall) {
        utils.npmInstall(appName);
      }
    }
  );
};
