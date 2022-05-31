import React, { useState } from "react";
import Moralis from "moralis";
import axios from "axios";

var YourApiKeyToken = "TVQ7CXSAVS8VYXHC84PGFA3I8A618IMQYQ";

const d = new Date();

async function checkERC20Value(result, setOutput) {
  const options = {
    address: result.token_address,
    chain: "Eth"
  };
  const price = await Moralis.Web3API.token.getTokenPrice(options);
  if (Number(price.usdPrice) >= 400) {
    setOutput((prev) => [
      ...prev,
      result.value / 10 ** 18 +
        " of " +
        result.token_name +
        " has been sent from " +
        result.sender +
        " to " +
        result.recipient
    ]);
  }
}

async function checkETHValue(result, setOutput) {
  if (Number(result.value) >= 1 * 10 ** 18) {
    setOutput((prev) => [
      ...prev,
      result.value / 10 ** 18 +
        " ETH " +
        " has been sent from " +
        result.sender +
        " to " +
        result.recipient
    ]);
  }
}

async function getBlock(time) {
  let URLtime = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${time}&closest=before&apikey=${YourApiKeyToken}`;

  await axios
    .get(URLtime)
    .then((response) => {
      console.log(response.data.result);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
}

async function fetchTransactions(setOutput) {
  setOutput([]);
  // Address of contract of interest
  console.log(`Fetching Txs For erc20`);
  let time = Math.round(d.getTime() / 1000 - 3);
  //console.log(time);
  //let blockIndex = Number(getBlock(time));
  //console.log('getblock return ' +getBlock(time));
  await getBlock(time);
  //console.log(`bstart=${blockIndex}`);

  let URL1 = `https://api.blockchair.com/ethereum/transactions?limit=100`;

  await axios
    .get(URL1)
    .then((response) => {
      console.log("num of results is " + response.data.data.length);
      let results = response.data.data;
      for (let j = 0; j < results.length; j++) {
        //if (Number(results[j].value) >= 10 * (10 ** 18)) {
        //    console.log(results[j].value / (10 ** 18) + ' of ' + results[j].token_name + ' has been sent from ' + results[j].sender + ' to ' + results[j].recipient);
        //}
        checkETHValue(results[j], setOutput);
      }
    })
    .catch((error) => {
      //console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

  let URL2 = `https://api.blockchair.com/ethereum/erc-20/transactions?limit=30`;

  await axios
    .get(URL2)
    .then((response) => {
      console.log("num of results is " + response.data.data.length);
      let results = response.data.data;
      for (let j = 0; j < results.length; j++) {
        //if (Number(results[j].value) >= 10 * (10 ** 18)) {
        //    console.log(results[j].value / (10 ** 18) + ' of ' + results[j].token_name + ' has been sent from ' + results[j].sender + ' to ' + results[j].recipient);
        //}
        setTimeout(checkERC20Value, 700, results[j], setOutput);
      }
    })
    .catch(function (error) {
      //console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
}

const Whale = () => {
  const [output, setOutput] = useState([]);
  const serverUrl = "https://ndmzfy2k4vne.usemoralis.com:2053/server";
  const appId = "dancwX26CjSTv88Kvgz5i1syQj4Cz7H5lP8aQpvu";
  Moralis.start({ serverUrl, appId });
  //Make the rate error disappear, but seems not working
  // Moralis.settings.setAPIRateLimit({
  //   anonymous: 10,
  //   authenticated: 20,
  //   windowMs: 60000
  // });
  return (
    <div>
      <button onClick={() => fetchTransactions(setOutput)}>
        Get Whale Info
      </button>
      <div>{output}</div>
    </div>
  );
};

export default Whale;
