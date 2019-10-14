const installExtension = require("electron-devtools-installer").default;

module.exports.setupDevtools = function(array) {
  array.forEach(item => {
    installExtension(item)
      .then(name => console.log(`installed extension:  ${name}`))
      .catch(err => console.log("error installing extension: ", err));
  });
};