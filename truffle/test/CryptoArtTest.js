var definition = artifacts.require("./CryptoArt.sol")

contract("CRA", accounts => {
    var owner = accounts[0];
    var user = accounts[1];
    var contract;
    beforeEach(async () => {
        contract = await definition.new({from: owner})
    })

    it("mint!", async () => {
        let tx = await contract.mint("ipfs hash", web3.toWei(.001, "ether", {from: owner}))
        let tokenId = tx.logs[0].args.tokenId;

        assert.equal(await contract.ownerOf(tokenId), contract.address);
    })

    it("buy token!", async () => {
        let tx = await contract.mint("ipfs hash", web3.toWei(.001, "ether", {from: owner}))
        let tokenId = tx.logs[0].args.tokenId;

        let tx2 = await contract.buyCard(tokenId, {from: user, value: web3.toWei(.001, "ether")})
        assert.equal(await contract.ownerOf(tokenId), user)
    }

    it("gets ipfs hash", async () => {
        let tx = await contract.mint("ipfs hash", web3.toWei(.001, "ether", {from: owner}))
        let tokenId = tx.logs[0].args.tokenId;

        assert.equal(await contract.getIpfsHash(tokenId), "ipfs hash");
    })

    it("gets tokens of", async () => {
        await contract.mint("ipfs hash!!", web3.toWei(.001, "ether", {from: owner}))
        await contract.mint("ipfs hash", web3.toWei(.001, "ether", {from: owner}))

        assert.equal(await contract.tokensOf(contract.address), 2);
    })

})