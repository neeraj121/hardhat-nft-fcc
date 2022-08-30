import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { deployments, ethers } from "hardhat";
import { BasicNFT } from "../../typechain-types";

describe("BasicNFT", function () {
    let basicNFT: BasicNFT;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
        const signers = await ethers.getSigners();
        deployer = signers[0];

        await deployments.fixture(["basicNFT"]);
        basicNFT = await ethers.getContract("BasicNFT");
    });

    it("was deployed", async () => {
        assert(basicNFT.address);
    });

    describe("Constructor", function () {
        it("Initilizes the NFT Correctly", async () => {
            const name = await basicNFT.name();
            const symbol = await basicNFT.symbol();

            expect(name.toString()).to.equal("Dogie");
            expect(symbol.toString()).to.equal("DOG");
        });
    });

    describe("Mint NFT", function () {
        it("Allows users to mint an NFT, and updates appropriately", async () => {
            const tokenCounterBefore = await basicNFT.getTokenCounter();
            const txResponse = await basicNFT.mintNFT();
            await txResponse.wait(1);
            const tokenURI = await basicNFT.tokenURI(tokenCounterBefore);
            const tokenCounterAfter = await basicNFT.getTokenCounter();
            expect(tokenCounterAfter.toString()).to.equal(
                tokenCounterBefore.add(1).toString()
            );
            expect(tokenURI).to.equal(await basicNFT.TOKEN_URI());
        });
    });
});
