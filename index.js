const { request } = require("./api");
const chalk = require("chalk");

let crypto = process.argv[2];

(async function main() {
  if (!crypto) {
    console.log(chalk.blue(`Required format:`));
    console.log(`node index.js CRYPTO_SYMBOL_HERE`);
    return 0;
  }
  const response = await request(crypto);
  console.log(response);
})();
