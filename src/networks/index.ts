import * as dotenv from "dotenv";

import rinkeby from "./rinkeby";
import mainnet from "./mainnet";

dotenv.config();

type Network = "rinkeby" | "mainnet";

const networkName = process.env.NETWORK_NAME as Network;


const networks: { [key: string]: any } = {
  rinkeby: rinkeby(networkName === "rinkeby"),
  mainnet: mainnet(networkName === "mainnet"),
};

export default networks[networkName];
