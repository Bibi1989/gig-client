import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GigContext } from "../../context/GigProvider";
import List from "./List";
import { Icon } from "semantic-ui-react";
import { LoadComp } from "../UserAuth/LoginForm";
import { Spinner } from "react-bootstrap";

const UserGig = () => {
  const { fetchProfileGig, gig, update, delete_gig, loading } = useContext(
    GigContext
  );

  useEffect(() => {
    fetchProfileGig();

    // eslint-disable-next-line
  }, [update, delete_gig]);

  if (loading) {
    return (
      <LoadComp>
        <Spinner
          animation='border'
          variant='info'
          style={{ width: "70px", height: "70px" }}
        />
      </LoadComp>
    );
  }

  return (
    <Container>
      <H1>Your Profile</H1>
      <Grid>
        {gig.length <= 0 ? (
          <H1>
            <Icon name='edit' /> You have not added a profile
          </H1>
        ) : (
          gig.map((g: any) => <List key={g.id} gig={g} />)
        )}
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
const H1 = styled.h1`
  color: #555;
  text-align: center;
  padding-bottom: 2em;
`;
