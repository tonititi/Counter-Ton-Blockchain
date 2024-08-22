import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";
import Counter from "./counter"; // this is the interface class we just implemented

async function main() {
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });
  console.log("done get client");
  // open Counter instance by address
  const counterAddress = Address.parse(
    "EQAOWhU1DBTe3T3_T8btOWRRNr0I0UN6oe8PRUUVy4lqP_Ue"
    // "EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb"
  ); // replace with your address from step 8
  const counter = new Counter(counterAddress);
  const counterContract = client.open(counter);
  console.log("Done open contract");
  // call the getter on chain
  const counterValue = await counterContract.getCounter();
  console.log("value:", counterValue.toString());
}

main();
