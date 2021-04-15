
import Web3 from "web3";

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


  // // const [userWallet, setUserWallet] = useRecoilState(metaMaskUserAccount)

  // // ------------DATA
  // export async function loadBlockchainData() {
  //   const web3 = window.web3;
  //   // Load account
  //   const accounts = await web3.eth.getAccounts();
  //   setUserWallet({ account: accounts[0] });
  //   const networkId = await web3.eth.net.getId();
  //   const networkData = CryptoArt.networks[networkId];
  //   console.log("-----", networkId)
  //   if (!networkData) { // Verifica si existe el contrato
  //     window.alert("Smart contract not deployed to detected network.");
  //     return;
  //   }

  //   const abi = CryptoArt.abi;                          // Abi del contrato
  //   const address = networkData.address;            // Adress del contrato
  //   const smartContract = await new web3.eth.Contract(abi, address);
  //   console.log("abi ----", abi)
  //   console.log("networkdata address", address)
  //   // console.log("smart contract", smartContract.methods.createCollectible)

  // }