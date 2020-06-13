import React, { useState } from "react";
import styled from "styled-components";
import { Icon, Card, Accordion } from "semantic-ui-react";
import { Badge } from "react-bootstrap";

import { fullName } from "../../utils/fullName";
import { Avatar } from "../UserGig/List";

const AuthGigList = ({ gig }: any) => {
  const header = (
    <Flex>
      <div>
        <H2>{fullName(gig.first_name, gig.last_name)}</H2>
        <BadgeStyle bgColor={gig.stack.split(" ")[0]}>
          {gig.stack} Developer
        </BadgeStyle>
      </div>
      <Avatar>
        {gig.first_name[0].toUpperCase()}
        {gig.last_name[0].toUpperCase()}
      </Avatar>
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
      <H2>Location</H2>
      <Ul>{<Li>{gig.location ? gig.location : "No Location"}</Li>}</Ul>
    </>
  );
  const footer = (
    <FlexFooter>
      <ShowContacts gig={gig} />
    </FlexFooter>
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

export default AuthGigList;

const Grid = styled.div`
  margin-bottom: 1em;
`;
const Flex = styled.div`
  display: flex;
  position: relative;
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
const FlexFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ActionIcons = styled.div`
  i:first-child {
    margin-right: 1em;
  }
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

export const ShowContacts = ({ gig }: any) => {
  const [state, setState] = useState({ activeIndex: 1 });

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;

    setState({ activeIndex: newIndex });
  };
  const { activeIndex } = state;
  return (
    <Accordion styled style={{ width: "100%" }}>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        Click To See Gig Contacts
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <div>
          <P>
            <Icon name='phone' /> Phone Number:{" "}
            {gig.phone ? gig.phone : "No Phone Number"}
          </P>
          <P>
            <Icon name='envelope' /> Email Address:{" "}
            {gig.email ? gig.email : "No Email Address"}
          </P>
          <P>
            <Icon name='browser' /> LinkedIn:{" "}
            {gig.linkedin_url ? gig.linkedin_url : "No LinkedIn link"}
          </P>
          <P>
            <Icon name='browser' /> Github:{" "}
            {gig.github_url ? gig.github_url : "No Github link"}
          </P>
        </div>
      </Accordion.Content>
    </Accordion>
  );
};
