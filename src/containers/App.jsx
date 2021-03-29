import React from "react"
//React-router-dom
import { Route, Switch } from "react-router-dom"
//Components
import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
import NavBar from "./NavBar"
import Creators from "./Creators"
import Artwork from "./Artwork"
import Profile from "./Profile"
import EditProfile from "./EditProfile"
import NewArtwork from "./NewArtwork"
//utils
import { UserFunctions } from "../utils/firebase/authEmail";
import { useEffect } from "react"


const App = () => {
  const {isUser} =  UserFunctions();
  useEffect(() => {
    isUser()
  })


  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route exact path={"/creators"} component={Creators} />
        <Route
          path={"/creators/:id"}
          render={({ match }) => <Profile match={match} />}
        />
        <Route path={"/artwork/create"} component={NewArtwork} />
        <Route
          path={"/artwork/:id"}
          render={({ match }) => <Artwork match={match} />}
        />
        <Route path={"/me"} component={Profile} />
        <Route path={"/me/edit"} component={EditProfile} />
      </Switch>
      <NavBar />
    </div>
  )
}

export default App
