import React from "react";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import Filter from "../components/Filter/Filter";
import AddGigPage from "./AddGig";
import GigComponent from "./Gig";

const UnAuthDash = () => {
  return (
    <>
      <Dashboard />
      <Filter />
      <H1>Login To Add a Gig Profile</H1>
      <GigComponent />
    </>
  );
};

export default UnAuthDash;

const H1 = styled.h1`
  text-align: center;
`;
