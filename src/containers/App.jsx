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
import Transaction from "./Transaction";
import ResetPasswordConfirmation from "./ResetPasswordConfirmation";
//utils
import { useWeb3 } from "@openzeppelin/network/react";
import { AuthFunctions } from "../utils/firebase/auth/authEmail";
import { useRecoilValue } from "recoil";
import { userAtom } from "../state/atoms";

const App = () => {
  const user = useRecoilValue(userAtom);
  const { isUser } = AuthFunctions();
  const web3Context = useWeb3("https://public-node.testnet.rsk.co/");
  const { networkId, accounts } = web3Context;

  useEffect(() => {
    isUser();
  }, []);

  useEffect(() => {}, [user, networkId, accounts]);

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
        <Route
          path={"/artwork/:id/edit"}
          render={({ match }) => <EditArtWork id={match.params.id} />}
        />
        <Route
          path={"/artwork/:id"}
          render={({ match }) => <Artwork id={match.params.id} />}
        />
        <Route exact path={"/me"} component={Profile} />
        <Route exact path={"/me/edit"} component={EditProfile} />
        <Route exact path={"/reset"} component={ResetPassword} />
        <Route
          exact
          path={"/reset/confirmation"}
          component={ResetPasswordConfirmation}
        />
        <Route
          path={"/transaction/:hash"}
          render={({ match }) => <Transaction hash={match.params.hash} />}
        />
      </Switch>
      <NavBar />
    </div>
  );
};

export default App;
