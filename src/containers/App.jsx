import React, { useEffect } from "react";
//React-router-dom
import { Route, Switch } from "react-router-dom";
//Components
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import NavBar from "./NavBar";
import Creators from "./Creators";
import Artwork from "./Artwork";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import EditArtWork from "./EditArtWork";
import NewArtwork from "./NewArtwork";
import ResetPassword from "./ResetPassword";
import ResetPasswordConfirmation from "./ResetPasswordConfirmation";
//utils
import { AuthFunctions } from "../utils/firebase/auth/authEmail";
import { useRecoilValue, useRecoilState } from "recoil";
import { userAtom, metaMaskUserAccount, smartContract, supplyAtom } from "../state/atoms";

// Blockchain
import Web3 from "web3";
import CryptoArt from "../truffle/truffle/contracts/CryptoArt.json"


const App = () => {
  const { isUser } = AuthFunctions();
  const user = useRecoilValue(userAtom);
  const [userWallet, setUserWallet] = useRecoilState(metaMaskUserAccount)
  const [contract, setContract] = useRecoilState(smartContract)
  // const [supply, setSupply] = useRecoilState(supplyAtom)

  useEffect(() => {
    isUser()
    loadWeb3()
    loadBlockchainData()
  }, []);

  useEffect(() => {}, [user])


  // Verifica Metamask
  async function loadWeb3() {
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
  // ------------DATA
  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log("account: ", accounts[0]);
    setUserWallet({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoArt.networks[networkId];
    console.log("-----", networkId)
    if (!networkData) { // Verifica si existe el contrato
      window.alert("Smart contract not deployed to detected network.");
      return;
    }

    const abi = CryptoArt.abi;                          // Abi del contrato
    const address = networkData.address;            // Adress del contrato
    const smartContract = await new web3.eth.Contract(abi, address);
    console.log("smart contract address", abi)
    console.log("smart contract", smartContract)
    // setContract({ smartContract }); 
    // const totalSupply = await contract.methods.totalSupply().call();
    // setSupply({ totalSupply });
  }

  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route exact path={"/creators"} component={Creators} />
        <Route
          path={"/creator/:id"}
          render={({ match }) => <Profile match={match} />}
        />
        <Route path={"/artwork/create"} component={NewArtwork} />
        <Route path={"/artwork/:id/edit"} 
         render={({ match }) => <EditArtWork id={match.params.id} />}
        />
        <Route
          path={"/artwork/:id"}
          render={({ match }) => <Artwork id={match.params.id} />}
        />
        <Route exact path={"/me"} component={Profile} />
        <Route exact path={"/me/edit"} component={EditProfile} />
        <Route exact path={"/reset"} component={ResetPassword} />
        <Route exact path={"/reset/confirmation"} component={ResetPasswordConfirmation} />
      </Switch>
      <NavBar />
    </div>
  );
};

export default App;
