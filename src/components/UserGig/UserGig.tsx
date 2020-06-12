import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GigContext } from "../../context/GigProvider";
import List from "./List";

const UserGig = () => {
  return (
    <Container>
      <H1>Your Profile</H1>
      <List />
    </Container>
  );
};

export default UserGig;

const Container = styled.div`
  padding: 2em 10%;

  @media (max-width: 769px) {
    padding: 2em 1em;
  }
`;
const Grid = styled.div``;
const H1 = styled.h1``;
