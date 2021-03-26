import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
import NavBar from "./NavBar"
import Creators from "./Creators"
import Artwork from "./Artwork"
import Profile from "./Profile"
import EditProfile from "./EditProfile"
import NewArtwork from "./NewArtwork"

const App = () => {
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
