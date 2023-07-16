import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export interface networkConfigItem {
    blockConfirmations?: number;
    vrfCoordinatorV2?: string;
    mintFee?: BigNumber;
    gasLane?: string;
    subscriptionId?: string;
    callbackGasLimit?: string;
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
    localhost: {
        blockConfirmations: 1,
        mintFee: ethers.utils.parseEther("0.01"),
        gasLane:
            "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        callbackGasLimit: "500000", //500,000
    },
    hardhat: {
        blockConfirmations: 1,
        mintFee: ethers.utils.parseEther("0.01"),
        gasLane:
            "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        callbackGasLimit: "500000", //500,000
    },
    rinkeby: {
        blockConfirmations: 6,
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        mintFee: ethers.utils.parseEther("0.01"),
        gasLane:
            "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        subscriptionId: "8284",
        callbackGasLimit: "500000", //500,000
    },
    kovan: {
        blockConfirmations: 1,
    },
};

export const developmentChains = ["hardhat", "localhost"];
