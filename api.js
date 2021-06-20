"use strict";

const fetch = require("node-fetch");
const chalk = require("chalk");

const { addCrypto } = require("./add");

//base url
const url = "https://api-pub.bitfinex.com/v2/";

// Change these based on relevant query params
const queryParams = "limit=1";

//checking the status of the server before triggering requests
async function checkPlatformStatus() {
  return await fetch(`https://api-pub.bitfinex.com/v2/platform/status`);
}

//getting the information of the requested crypto
//if empty will return []
async function getCryptoInfo(crypto) {
  const req = await fetch(`${url}/trades/${crypto}/hist?${queryParams}`);
  return await req.json();
}

//main block
async function request(crypto) {
  try {
    if (!checkPlatformStatus())
      return `Server is under maintainance, please try again after sometime`;
    const cryptoInfo = await getCryptoInfo(crypto);
    //checking data exisitence
    if (!cryptoInfo.length) {
      console.log(chalk.red("Crypto not found!"));
      return `${crypto} does not exist, please enter the correct symbol`;
    } else {
      let price = JSON.stringify(cryptoInfo[0][3]);
      await addCrypto(crypto, price);
      return `The price of ${crypto} is ${price} USD`;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  request,
};
