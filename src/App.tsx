import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// component imports
import { GigProvider } from "./context/GigProvider";
import Nav from "./components/Nav/Nav";
import Dash from "./pages/Dash";
import GigComponent from "./pages/Gig";
import AddGigPage from "./pages/AddGig";
import Filter from "./components/Filter/Filter";
import LoginComponent from "./pages/LoginComponent";
import RegisterComponent from "./pages/RegisterComponent";

// bootstrap style link
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <GigProvider>
        <Router>
          <Nav />
          <Switch>
            <Route path='/' exact component={Dash} />
            <Route path='/login' exact component={LoginComponent} />
            <Route path='/register' exact component={RegisterComponent} />
          </Switch>
        </Router>
      </GigProvider>
    </UserProvider>
  );
}

export default App;
