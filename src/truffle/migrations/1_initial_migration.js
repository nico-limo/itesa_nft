const Migrations = artifacts.require("Migrations");
const CryptoArt = artifacts.require("CryptoArt");

module.exports = function (deployer) {
  deployer.deploy(CryptoArt);
};
