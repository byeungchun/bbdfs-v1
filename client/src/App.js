import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/page/Home";
import About from "./components/page/About";
import Navbar from "./components/layout/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
