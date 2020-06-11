import React from "react";

// component imports
import { GigProvider } from "./context/GigProvider";
import Nav from "./components/Nav/Nav";
import Dash from "./pages/Dash";
import GigComponent from "./pages/Gig";
import AddGigPage from "./pages/AddGig";
import Filter from "./components/Filter/Filter";

// bootstrap style link
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <GigProvider>
      <Nav />
      <Dash />
      <Filter />
      <AddGigPage />
      <GigComponent />
    </GigProvider>
  );
}

export default App;
