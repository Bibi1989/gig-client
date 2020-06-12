import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GigContext } from "../../context/GigProvider";
import List from "./List";

const UserGig = () => {
  const { fetchProfileGig, gig, update, delete_gig } = useContext(GigContext);

  useEffect(() => {
    fetchProfileGig();
  }, [update, delete_gig]);
  return (
    <Container>
      <H1>Your Profile</H1>
      <Grid>
        {gig !== undefined && gig.map((g: any) => <List key={g.id} gig={g} />)}
      </Grid>
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
