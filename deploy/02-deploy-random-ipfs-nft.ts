import { ethers, network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { RandomIPFSNFT, VRFCoordinatorV2Mock } from "../typechain-types";

const FUND_AMOUNT = ethers.utils.parseEther("30");
const imagesLocation = "./images/randomNft/";
let tokenUris = [
    "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
    "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d",
    "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
];

const deployRandomIPFSNFT: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    let vrfCoordinatorV2Address: string;
    let subscriptionId: string;
    if (developmentChains.includes(network.name)) {
        // use mock
        const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock =
            await ethers.getContract("VRFCoordinatorV2Mock");
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;

        const txResponse = await vrfCoordinatorV2Mock.createSubscription();
        const txReceipt = await txResponse.wait(1);
        subscriptionId = txReceipt.events![0].args!.subId;
        // Fund the subscription
        // Our mock makes it so we don't actually have to worry about sending fund
        await vrfCoordinatorV2Mock.fundSubscription(
            subscriptionId,
            FUND_AMOUNT
        );
    } else {
        vrfCoordinatorV2Address = networkConfig[network.name].vrfCoordinatorV2!;
        subscriptionId = networkConfig[network.name].subscriptionId!;
    }

    const mintFee = networkConfig[network.name].mintFee;
    const gasLane = networkConfig[network.name].gasLane;
    const callbackGasLimit = networkConfig[network.name].callbackGasLimit;
    const args = [
        vrfCoordinatorV2Address,
        gasLane,
        subscriptionId,
        callbackGasLimit,
        dogTokenURIs,
        mintFee,
    ];
    const randomIPFSNFT: RandomIPFSNFT = await deploy("RandomIPFSNFT", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations,
    });
};

export default deployRandomIPFSNFT;
deployRandomIPFSNFT.tags = ["all", "randomIPFSNFT"];
