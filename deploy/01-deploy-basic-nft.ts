import { network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployBasicNFT: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("----------------------------------");
    const args: any[] = [];
    const basicNFT = await deploy("BasicNFT", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations,
    });

    if (!developmentChains.includes(network.name)) {
        log("Verifying...");
        await verify(basicNFT.address, args);
    }
    log("----------------------------------");
};

export default deployBasicNFT;

deployBasicNFT.tags = ["all", "basicNFT"];
