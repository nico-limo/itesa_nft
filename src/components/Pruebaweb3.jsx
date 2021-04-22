import React from "react";

import { useWeb3 } from "@openzeppelin/network/react";

function Web3() {
  const web3Context = useWeb3("https://public-node.testnet.rsk.co/");
  const { networkId, networkName, providerName } = web3Context;

  return (
    <div className="App">
      <div>
        <h1>OpenZeppelin Network.js</h1>
        <div>
          Network:{" "}
          {networkId ? `${networkId} – ${networkName}` : "No connection"}
        </div>
        <div>Provider: {providerName}</div>
      </div>
    </div>
  );
}

export default Web3;
