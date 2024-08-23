import * as fs from "fs";
import * as path from "path";
import {
  Address,
  beginCell,
  storeStateInit,
  contractAddress,
  toNano,
} from "@ton/core";
import { Factory } from "./files/tact_Factory";
import { prepareTactDeployment } from "@tact-lang/deployer";

async function run() {
  // Parameters
  let testnet = true; // Flag for testnet or mainnet
  const addr = process.env.ADDRESSV4 ?? "";
  let owner = Address.parse(addr); // Our sample contract has an owner
  const init = await Factory.init(owner); // Create initial data for our contract

  // Calculations
  let address = contractAddress(0, init); // Calculate contract address. MUST match with the address in the verifier
  let data = init.data.toBoc(); // Create init data
  let pkg = fs.readFileSync(
    // Read package file
    "./files/tact_Factory.pkg"
  );

  // Prepare deploy
  let link = await prepareTactDeployment({ pkg, data, testnet });

  // Present a deployment link and contract address
  console.log("Address: " + address.toString({ testOnly: testnet }));
  console.log("Deploy link: " + link);
}
run();
