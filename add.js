const fs = require("fs");
const chalk = require("chalk");

const addCrypto = (name, price) => {
  const cryptos = loadCryptos();
  const duplicateCrypto = cryptos.findIndex((crypto) => crypto.name === name);
  if (duplicateCrypto === -1) {
    cryptos.push({
      name,
      price,
    });
    console.log(chalk.green.inverse("Crypto added!"));
  } else {
    cryptos.splice(duplicateCrypto, 1, { name, price });
    console.log(chalk.yellow("Crypto updated!"));
  }
  saveCryptos(cryptos);
};

//formatting to string and saving crypto.json after use
const saveCryptos = (cryptos) => {
  const dataJSON = JSON.stringify(cryptos);
  fs.writeFileSync("crypto.json", dataJSON);
};

//fetching data and parsing it to writable format
const loadCryptos = () => {
  try {
    const dataBuffer = fs.readFileSync("crypto.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addCrypto,
};
