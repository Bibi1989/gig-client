import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import GigList from "./GigList";
// import { contents } from "../../utils/data";
import { GigContext } from "../../context/GigProvider";
import { Spinner } from "react-bootstrap";

const Gig = () => {
  const { fetchGig, gigs } = useContext(GigContext);
  useEffect(() => {
    fetchGig();
  }, []);
  return (
    <Container>
      <Flex>
        {gigs.length <= 0 ? (
          <div>
            {/* <Spinner animation='border' variant='info' /> */}
            <h1 style={{ textAlign: "center" }}>No Gig found!!!</h1>
          </div>
        ) : (
          gigs.map((array: any) => <GigList gig={array} />)
        )}
      </Flex>
    </Container>
  );
};

export default Gig;

const Container = styled.div``;
const Flex = styled.div`
  padding: 2em 10%;

  @media (max-width: 769px) {
    padding: 2em 1em;
  }
`;
