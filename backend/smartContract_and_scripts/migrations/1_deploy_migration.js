var gallery = artifacts.require("NFTGallery");
var rank = artifacts.require("RankToken");
var token = artifacts.require("LPToken");
var token2 = artifacts.require("Token");

module.exports = async function (deployer) {

let accounts = await web3.eth.getAccounts()
  const NFT721name = "NFTGallery";
  const NFT721symbol = "NFTG";
  const NFT1155name = "RANKToken";
  const NFT1155symbol = "RANKT";
  const tokenURIPrefix_Rank = "https://gateway.pinata.cloud/ipfs/QmcV4NPDmBERgx2XJae9N3WTjfxhHh4PBLLK3i7n3fMYuM/"
  const tokenURIPrefix = "https://gateway.pinata.cloud//ipfs/"
  await deployer.deploy(token, accounts[0]);
  await deployer.deploy(token2, accounts[0]);
  let LPInstance = await token.deployed();
  await deployer.deploy(gallery, NFT721name, NFT721symbol, tokenURIPrefix, LPInstance.address);
  await deployer.deploy(rank, NFT1155name, NFT1155symbol, tokenURIPrefix_Rank);

};