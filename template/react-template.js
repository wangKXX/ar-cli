const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora("Loading undead unicorns");

module.exports = appName => {
  spinner.start("project init....");
  download(
    "direct:https://github.com/wangKXX/template.git",
    appName,
    { clone: true },
    err => {
      if (err) {
        spinner.fail(chalk.green("下载失败 \n" + err));
        process.exit();
      }
      spinner.succeed(chalk.green(`下载成功`));
    }
  );
};
