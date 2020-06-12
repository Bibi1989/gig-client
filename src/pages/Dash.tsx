import React from "react";
import Dashboard from "../components/Dashboard";
import Filter from "../components/Filter/Filter";
import AddGigPage from "./AddGig";
import GigComponent from "./Gig";

const Dash = () => {
  return (
    <>
      <Dashboard />
      <Filter />
      <AddGigPage />
      <GigComponent />
    </>
  );
};

export default Dash;
