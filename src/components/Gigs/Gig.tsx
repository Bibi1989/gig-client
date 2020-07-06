import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import GigList from "./GigList";
import { GigContext } from "../../context/GigProvider";
import { Spinner } from "react-bootstrap";
import AuthGigList from "./AuthGigList";

const Gig = () => {
  const divRef = useRef<boolean>(false);
  const { fetchGig, gigs, loading } = useContext(GigContext);
  useEffect(() => {
    fetchGig();

    // eslint-disable-next-line
  }, [divRef]);
  return (
    <Container>
      <Flex>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spinner animation='border' variant='info' />
          </div>
        )}
        {gigs.length <= 0
          ? !loading && (
              <div>
                <h1 style={{ textAlign: "center" }}>No Gig found!!!</h1>
              </div>
            )
          : gigs.map((array: any) => {
              return (
                <div key={array.id}>
                  {sessionStorage.getItem("gig_token") ? (
                    <AuthGigList gig={array} />
                  ) : (
                    <GigList gig={array} />
                  )}
                </div>
              );
            })}
      </Flex>
    </Container>
  );
};

export default Gig;

const Container = styled.div`
  .hide {
    display: none;
  }

  .show {
    display: block;
  }
`;
const Flex = styled.div`
  padding: 2em 10%;

  @media (max-width: 769px) {
    padding: 2em 1em;
  }
`;
