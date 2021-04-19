
import Web3 from "web3";
//Recoil
import { useRecoilState } from "recoil"
import { metaMaskUserAccount, smartContract } from "../../state/atoms"
import CryptoArt from "../../truffle/truffle/contracts/CryptoArt.json"

// Verifica Metamask --------------
export async function loadWeb3() {
  if (window.ethereum) {
    // current web3 providers
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    // fallback for older web3 providers
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    // no web3 provider, user needs to install one in their browser
    window.alert("No injected web3 provider detected");
  }
  console.log(window.web3.currentProvider);
}

export const useBlockchainData = () => {
  // Metamask
  const [userWallet, setUserWallet] = useRecoilState(metaMaskUserAccount)
  const [contract, setContract] = useRecoilState(smartContract)
  // const [supply, setSupply] = useRecoilState(supplyAtom)

  // ----   DATA
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    setUserWallet({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoArt.networks[networkId];
    console.log("Network Id", networkId)
    console.log("Network Id", CryptoArt.networks)
    if (!networkData) { // Verifica si existe el contrato
      window.alert("Smart contract not deployed to detected network.");
      return;
    }

    const abi = CryptoArt.abi;                  // Abi del contrato
    const address = networkData.address;        // Adress del contrato
    const smartContract = await new web3.eth.Contract(abi, address);
    setContract(smartContract.methods)      // Funciones de nuestros smart contracts guardados en un átomo.
    // console.log("contract", contract)
    console.log("abi ----", abi)
    console.log("networkdata address", address)


    let obj = {
      contracts: smartContract.methods,
      userWallet: accounts[0]
    }
    return obj;
  }

  return { loadBlockchainData, userWallet };
};
