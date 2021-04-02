import React,{useEffect} from "react";
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
import NewArtwork from "./NewArtwork";
//utils
import { AuthFunctions } from "../utils/firebase/authEmail";
import { useRecoilValue } from "recoil"
import { userAtom } from "../state/atoms";

const App = () => {
  const { isUser } = AuthFunctions();
  const user = useRecoilValue(userAtom);

  useEffect(() => isUser(), []);

  useEffect(() => {}, [user])

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
          path={"/artwork/:id"}
          render={({ match }) => <Artwork id={match.params.id} />}
        />
        <Route exact path={"/me"} component={Profile} />
        <Route exact path={"/me/edit"} component={EditProfile} />
      </Switch>
      <NavBar />
    </div>
  );
};

export default App;
