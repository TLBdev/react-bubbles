import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from './components/BubblePage'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute path='/bubblepage' component={BubblePage} />
          <Route exact path="/" component={Login} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
