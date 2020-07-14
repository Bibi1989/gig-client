import React, { useState } from "react";
import { Icon, Card, Accordion } from "semantic-ui-react";

import { fullName } from "../../utils/fullName";
import {
  BadgeStyle,
  FlexFooter,
  CardStyle,
  Flex,
  H2,
  Ul,
  Li,
  P,
  Grid,
  Avatar,
} from "../commons/style";

const AuthGigList = ({ gig }: any) => {
  const header = (
    <Flex>
      <div>
        <H2>{fullName(gig.first_name, gig.last_name)}</H2>
        <BadgeStyle bgColor={gig.stack.split(" ")[0]}>
          {gig.stack} Developer
        </BadgeStyle>
      </div>
      <Avatar width='70px'>
        {gig.profile_image ? (
          <img src={gig.profile_image} alt='Profile' />
        ) : (
          // <>
          //   {gig.first_name[0].toUpperCase()}
          //   {gig.last_name[0].toUpperCase()}
          // </>
          ""
        )}
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
            <Icon name='browser' /> Portfolio:{" "}
            {gig.portfolio_url ? gig.portfolio_url : "No LinkedIn link"}
          </P>
          <P>
            <Icon name='browser' /> LinkedIn:{" "}
            {gig.linkedin_url ? gig.linkedin_url : "No LinkedIn link"}
          </P>
          <P>
            <Icon name='browser' /> Github:{" "}
            {gig.github_url ? gig.github_url : "No Github link"}
          </P>
          <P>
            <Icon name='browser' /> Proficiency Level:{" "}
            {gig.proficiency ? gig.proficiency : "No Github link"}
          </P>
        </div>
      </Accordion.Content>
    </Accordion>
  );
};
