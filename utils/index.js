const fs = require("fs");

module.exports = {
  isFileExist: function(file) {
    return fs.existsSync(file);
  }
}