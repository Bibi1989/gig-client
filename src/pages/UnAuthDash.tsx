import React from "react";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import Filter from "../components/Filter/Filter";
import GigComponent from "./Gig";

const UnAuthDash = (props: any) => {
  return (
    <>
      <Dashboard />
      <Filter />
      <H1 onClick={() => props.history.push("/login")}>
        Login To Add a Gig Profile
      </H1>
      <GigComponent />
    </>
  );
};

export default UnAuthDash;

const H1 = styled.p`
  text-align: center;
  padding: 1em;
  background: #17a2b8;
  color: white;
  width: 80%;
  margin: auto;
  border-radius: 0.25em;
  cursor: pointer;

  @media (max-width: 769px) {
    width: 94%;
  }
`;
