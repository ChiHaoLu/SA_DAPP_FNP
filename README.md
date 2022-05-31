# 🩺 SmartAggregator Whitepaper
> A De-Application with Dev. Tools. & BOT Package
> 1. Login, Compile, Deploy and Transfer to Interface!  Save lots of your time by converting the ABI to Interface, which can used in your Dapp!
> 2. NFT Verify, Login and Swap System API Package support  your Dapp!
> 3. Whale Alert, Minting Track and Celebrity  Track help you  distinguish the market well!


###### tags: `swfLAB`

:::warning
⚠️⚠️⚠️ **WORK IN PROGRESS** ⚠️⚠️⚠️
:::

* **Now Version: Beta Ver.2**
* Final Updated: 2022/5/27

---

## 🚩 Introduction

### What is SmartAggregator

**🩺 SmartAggregator(SA)** is a Blockchain Application Development Aggregator.

**🩺 SA** is a Decentralized Application which is similar with [Remix IDE](https://remix.ethereum.org/) and some other Dev. Tools

Not just the functionality of Compile, Deploy, Smart Contract Iteractive Area, user can do the Unit Testing and get the useful "Dapp Functionality Code" from their Smart Contract src. e.g. `<LoginButton />`, `<MintButton />`

SmartAggregator 是一個 Dapp 開發的聚合器，基本上為類似一個工具箱的概念可以讓顧客在裡面使用多種服務，包含：
* Smart Contract
    * Solidity 編輯器
    * 編譯 & 部署
    * 合約函式互動(Future Plan...)
    * 安全性偵測(Future Plan...)
* Dapp Package
    * NFT Verify System
    * Login System Modul
    * Swap System(Future Plan...)
* BOT
    * 巨鯨資產移動警報
    * NFT Minted 追蹤
    * 名人地址追蹤

### Where is SmartAggregator
* [Live Demo](https://frolicking-nougat-cbc6ab.netlify.app/)

### 🏇 Team

| Member | Numbers | Tasks | Others | 
| -------- | -------- | -------- | -------- |
| 🚩 ALu | B08303113 |S.C, Dapp | System Design, White Paper |
| killimilli | B08303116 | Front-End, NFTVerifySys, LoginSys | Operation |
| ExcitedMail | B07902120 |  BOT System |  |
| 林治善  | B07902104 | BOT System |  |
| 文藤げんき(謝獻沅)  | B07902049 | BOT System |  |

---

## 📜 System Design

* [System Design & Website Arch. - draw.io](https://drive.google.com/file/d/1RFT2YcphT_GwR6zCZkki52Py2Etu_ezk/view?usp=sharing)

### Smart Contract System

* 📜 Solidity Editor
    * [highlightjs-solidity](https://www.npmjs.com/package/highlightjs-solidity)
* 💻 Compiler & 📡 Deployer
* 🎮 Fx. Interaction
* 💣 Security Detection
    * [Slither](https://github.com/crytic/slither)

### Dapp Package System

* 🔒 Verify System
* 🎃 Login System
    * Similar to [Web3Modal](https://github.com/Web3Modal/web3modal)
* 🔗 Swap System
    * 串接 [UniSwap API](https://docs.uniswap.org/protocol/V2/reference/API/overview)

### BOT System

* API 
    * [Etherscan APIs](https://etherscan.io/apis)
    * [Opensea-js API](https://github.com/ProjectOpenSea/opensea-js)
* 🚨 Whale Alert
    * Similar to [WhaleBot Alert](https://twitter.com/whale_alert)
    * ![](https://i.imgur.com/darw01yl.jpg)
    * [clank](https://clankapp.com/ethereum)
* ⚓ Minted Track
    * Similar to [AcNFT](https://www.acnft.xyz/)
* 📢 Celebrity Track
    * 系統設計圖上面的 Selector 就是可以選看要看哪個名人或者組織的近期交易紀錄/資產狀況
    * Resource: [famouswallets](https://famouswallets.com/atheletes.html)

| People | Address | 
| -------- | -------- | 
| Ethereum Foundation |0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe | 
| Vitalik     | 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B      | 
|Jack Dorsey| 0x925eD2034a30D54333beaB3593956bc0E6fC9C62 |
|Mark Cuban | 0xa679c6154b8d4619Af9F83f0bF9a13A680e01eCf | 
| Beeple | 0xc6b0562605D35eE710138402B878ffe6F2E23807 | 
|  Steph Curry|0x3becf83939f34311b6bee143197872d877501b11   | 
| Shaquille O'Neal |0x3C6aEFF92b4B35C2e1b196B57d0f8FFB56884A17| 
| Neymar Jr | 0xC4505dB8CC490767fA6f4b6f0F2bDd668B357A5D | 
| Snoop Dogg | 0xCe90a7949bb78892F159F428D0dC23a8E3584d75 | 
|  JustinBieberNFTS |    0xE21DC18513e3e68a52F9fcDaCfD56948d43a11c6   | 
| Machi 大哥|0x020cA66C30beC2c4Fe3861a94E4DB4A498A35872|
|  周杰倫   | 0x1087f515f7FaAE8B35045e91092ea8878B757849 | 
|   林俊傑  |0x225558706370bef1760c52e76a07be9c104c98aa| 
|黃明志 | 0xd3a3fB18e1ba3770918636A57F1E605924C23C7B |
