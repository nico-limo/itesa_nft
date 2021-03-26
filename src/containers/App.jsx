import React from 'react'
import {Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
        </Switch>
    </div>
  )
}

export default App

