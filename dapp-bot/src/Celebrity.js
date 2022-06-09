import React, { useState } from "react";
import axios from "axios";

var YourApiKeyToken = "";
var celebrityList = [
  ["Ethereum Foundation", "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"],
  ["Vitalik", "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"],
  ["Jack Dorsey", "0x925eD2034a30D54333beaB3593956bc0E6fC9C62"],
  ["Mark Cuban", "0xa679c6154b8d4619Af9F83f0bF9a13A680e01eCf"],
  ["Beeple", "0xc6b0562605D35eE710138402B878ffe6F2E23807"],
  ["Steph Curry", "0x3becf83939f34311b6bee143197872d877501b11"],
  ["Shaquille O’Neal", "0x3C6aEFF92b4B35C2e1b196B57d0f8FFB56884A17"],
  ["Neymar Jr", "0xC4505dB8CC490767fA6f4b6f0F2bDd668B357A5D"],
  ["Snoop Dogg", "0xCe90a7949bb78892F159F428D0dC23a8E3584d75"],
  ["JustinBieberNFTS", "0xE21DC18513e3e68a52F9fcDaCfD56948d43a11c6"],
  ["Machi 大哥", "0x020cA66C30beC2c4Fe3861a94E4DB4A498A35872"],
  ["周杰倫", "0x1087f515f7FaAE8B35045e91092ea8878B757849"],
  ["林俊傑", "0x225558706370bef1760c52e76a07be9c104c98aa"],
  ["黃明志", "0xd3a3fB18e1ba3770918636A57F1E605924C23C7B"],
  ["Logan Paul", "0xff0bd4aa3496739d5667adc10e2b843dfab5712b"],
  ["Jay Z", "0x3b417faee9d2ff636701100891dc2755b5321cc3"],
  ["Jordan Belfort", "0xdbf2445e5049c04cda797dae60ac885e7d79df9d"],
  ["Mike Shinoda", "0xb55eb9bd32d6ab75d7555192e7a3a7ca0bcd5738"],
  ["Oli White", "0xe033b12daf37e64d6e664ac5b8eb839ce5b749db"],
  ["FaZe Banks", "0x7d4823262bd2c6e4fa78872f2587dda2a65828ed"]
];
const d = new Date();
var blockIndex;

const getBlock = async (time) => {
  let URLtime = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${time}&closest=before&apikey=${YourApiKeyToken}`;
  await axios
    .get(URLtime)
    .then((response) => {
      //Get the current block index
      blockIndex = response.data.result;
    })
    .catch(function (error) {
      console.log("error");
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
};

async function fetchTransactions(setOutput) {
  setOutput([]);
  console.log(
    `Fetching recent Txs of ${celebrityList[0][0]}, ${celebrityList[1][0]}, ${celebrityList[2][0]} and some other celebrities.`
  );

  let time = Math.round(d.getTime() / 1000 - 3);
  await getBlock(time);
  // console.log(time);
  for (let i = 0; i < celebrityList.length; i++) {
    console.log("Checking celebrity No." + i);
    let URL1 = `https://api.etherscan.io/api?module=account&action=txlist&address=${
      celebrityList[i][1]
    }&startblock=${
      blockIndex - 40000
    }&endblock=${blockIndex}&sort=desc&apikey=${YourApiKeyToken}`;

    //Check normal transactions
    await axios
      .get(URL1)
      .then((response) => {
        let results = response.data.result;
        for (let j = 0; j < results.length; j++) {
          //If the value is more than 10 ETH in one transaction, I print the info.
          if (Number(results[j].value) >= 4 * 10 ** 18) {
            setOutput((prev) => [
              ...prev,
              "Address " +
                results[j].from +
                " has sent " +
                results[j].value / 10 ** 18 +
                " ETH to Address " +
                results[j].to +
                ".\n" +
                celebrityList[i][1] +
                " is " +
                celebrityList[i][0] +
                "'s account.\n"
            ]);
          }
        }
      })
      .catch(function (error) {
        console.log("error");
        // if (error.response) {
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // }
      });
    //external transaction over

    //Check internal transactions
    let URL2 = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${
      celebrityList[i][1]
    }&startblock=${
      blockIndex - 40000
    }&endblock=${blockIndex}&sort=desc&apikey=${YourApiKeyToken}`;

    await axios
      .get(URL2)
      .then((response) => {
        let results = response.data.result;
        for (let j = 0; j < results.length; j++) {
          //If the value is more than 10 ETH in one transaction, I print the info.
          if (Number(results[j].value) >= 4 * 10 ** 18) {
            setOutput((prev) => [
              ...prev,
              "Address " +
                results[j].from +
                " has sent " +
                results[j].value / 10 ** 18 +
                " ETH to Address " +
                results[j].to +
                ".\n" +
                celebrityList[i][1] +
                " is " +
                celebrityList[i][0] +
                "'s account.\n"
            ]);
          }
        }
      })
      .catch(function (error) {
        console.log("error");
        // if (error.response) {
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // }
      });
  }
}

const Celebrity = () => {
  const [output, setOutput] = useState([]);
  return (
    <div>
      <button onClick={() => fetchTransactions(setOutput)}>
        Get Celebrity Info
      </button>
      <div>{output}</div>
    </div>
  );
};

export default Celebrity;
