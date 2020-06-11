import React from "react";
import styled from "styled-components";
import { Icon, Card } from "semantic-ui-react";
import { Badge, Accordion, Button } from "react-bootstrap";

import { fullName } from "../../utils/fullName";

const GigList = ({ gig }: any) => {
  const header = (
    <Flex>
      <div>
        <H2>{fullName(gig.first_name, gig.last_name)}</H2>
        <BadgeStyle bgColor={gig.stack.split(" ")[0]}>
          {gig.stack} Developer
        </BadgeStyle>
      </div>
    </Flex>
  );
  const descriptions = (
    <>
      <H2>Skills</H2>
      <Ul>
        {gig.technologies.map((technology: string, index: number) => (
          <Li key={index}>{technology}</Li>
        ))}
      </Ul>
    </>
  );
  const footer = (
    <>
      <P>
        <Icon name='browser' /> LinkedIn:{" "}
        {gig.linkedin_url ? gig.linkedin_url : "No LinkedIn link"}
      </P>
      <P>
        <Icon name='browser' /> Github:{" "}
        {gig.github_url ? gig.github_url : "No Github link"}
      </P>
    </>
  );
  return (
    <Grid>
      <CardStyle>
        <Card.Content header={header} />
        <Card.Content description={descriptions} />
        <Card.Content>{footer}</Card.Content>
      </CardStyle>
    </Grid>
  );
};

export default GigList;

const Grid = styled.div`
  margin-bottom: 1em;
`;
const Flex = styled.div`
  display: flex;
`;
const H2 = styled.h2`
  color: #555555;
`;
const P = styled.p`
  color: #888;
`;
const Ul = styled.ul`
  color: #888;
`;
const Li = styled.li`
  color: #888;
`;

const CardStyle = styled(Card)`
  width: 100% !important;
`;

const BadgeStyle = styled(Badge)`
  background: ${({ bgColor }) =>
    bgColor === "Front"
      ? "orangered"
      : bgColor === "Back"
      ? "teal"
      : bgColor === "Full" && "blue"};
  color: white;
`;
