import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Screen1 from "./components/screen1/screen1";
import Screen2 from "./components/screen2/screen2";

function App(){
    return <div>
        <Router>
            <Switch>
                <Route path="/" exact component={Screen1} />
                <Route path="/dashboard" component={Screen2} />
            </Switch>
        </Router>
    </div>
}

export default App;