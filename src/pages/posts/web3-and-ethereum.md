---
layout: ../../layouts/PostLayout.astro
title: Web3 and Ethereum
publishDate: 16 December 2021
description: Technical details about the upcoming Web3 and its changes.
author: "Stefan Asandei"
tags: []
---

Recently, near the end of 2021, Web3 has been trending, more and more people talk about it. It introduces a new way of building applications, and because of this, there are a lot of misconceptions. In this article, I'll talk about its technical details, how it works, and of course, about its central technology: Ethereum. We'll start with a high overview and then go lower and lower.

## Web 3

In Web3, developers can build **dapps**: decentralized applications. Contrary to the current Web2, dapps are not controlled and censored by a central entity, like a company. The frontend can be built with any language and framework, like a Web2 app. The difference comes at the backend, where we used to use languages like JavaScript or Python, now we write Smart Contracts, which run on the Block Chain. We'll dive deeper into this in the Ethereum Section.

So basically, the frontend can be the same but the backend now runs on a decentralized network with another programming language.

## Ethereum

Ethereum represents the network of the Ethereum Block Chain. It's running from the Ethereum Virtual Machine, a single, canonical computer, represented by the computing power of the miners. Why is Ethereum special? Why isn't Bitcoin, or Dogecoin the main currency of the Web3? It's because Ethereum isn't only just a cryptocurrency, it has support for smart contracts, which can be run decentralized on the Block Chain. Since those are Turing complete, you can build almost any product using Solidity, the programming language for smart contracts, deploy it to the Block Chain, and have your code running on the EVM! This allowed the creation of many things, like NFTs (Non-fungible tokens), which are just digital proof of ownership powered by smart contracts on the Block Chain. Here is an example of how a smart contract for an NFT might look like:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
```

This is not a Solidity tutorial, but as a big overview, the code above:

- creates a MyNFT smart contract, with a mintNFT function
- it takes the wallet address of the recipient
- and the NFT metadata, a JSON document, as the tokenURI
- mintNFT calls some methods from the inherited ERC-721 library, and ultimately returns a number that represents the ID of the freshly minted NFT.

## Accounts

There are two types of accounts in the Ethereum network: owned by humans and owned by smart contracts. The first type can be created for free, the second one costs Ether because it's consuming computing power from the EVM.

## Ether

Ether, or ETH, is the primary currency on the Ethereum network. You might've heard Ether being referred as Ethereum, this mistake is agreed. Whenever you create a transaction, a small fee of ETH gets paid to the miner. To host and run smart contracts on Block Chain, you also have to pay in ETH for the computing power used.

## Mining

Whenever you create a transaction, its data gets added to a block. The block consists of dozens of other transactions. To verify the legitimacy of those blocks, computers from the EVM, also known as nodes, take part in a competition to solve a "puzzle", using brute force, the first one to finish gets the ETH fee.

## Gas

The gas is the fuel powering the Ethereum network. It's used to measure the computational effort required to execute a specific task on the EVM. Thus the miners can get paid. As of December 2021, each block has a gas limit and a base fee, the users are allowed to send a tip to the miner. The transaction fee equals to `Gas units (limit) * (Base fee + Tip)`, measured in Gwei. The Ethereum Network can adjust the size of a block depending on the demand. This means if the block size is greater, the protocol will increase the base fee for the following block. Similarly, the protocol will decrease the base fee if the block size is less. This way the fee accords to the demand of the block. The gas fee needs to exist so the computation power of the EVM isn't wasted, since the user needs to pay real money for it.

## The big picture

That's a lot of information, but let's see some big overviews of the concept we've covered. A potential tech stack for a Web3 dapp:

- Next.js Frontend written in TypeScript
- Solidity backend running as a Smart Contract on the Ethereum Network.

What happens when you create a transaction:

- the transaction gets filled with the required metadata
- it gets appended to a block
- the block is submitted to the Block Chain
- the miners verify its legitimacy
- nodes on the network start competing
- you pay the gas fee for them
- the changes are applied to the global state of the EVM

I hope this article cleared out some details about the upcoming Web3!

## References:

- Ethereum Developer Documentation: https://ethereum.org/en/developers/docs/
- Wikipedia page for Ethereum: https://en.wikipedia.org/wiki/Ethereum
- "Is Web3 all Hype?", from Fireship https://youtu.be/wHTcrmhskto
