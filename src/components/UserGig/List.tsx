import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { fullName } from "../../utils/fullName";
import { Icon, Card, Accordion } from "semantic-ui-react";
import { Badge } from "react-bootstrap";
import { GigContext } from "../../context/GigProvider";
import ModifyComponent from "./ModifyComponent";
import ImageUpload from "./ImageUpload";
import SelectModification from "./SelectModification";

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
  ActionIcons,
  Line,
} from "../commons/style";

const List = ({ gig }: any) => {
  const { fetchProfileGig, currentGig, deleteGig, current } = useContext(
    GigContext
  );

  const [state, setState] = useState({ activeIndex: 1 });

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;

    setState({ activeIndex: newIndex });
  };
  const { activeIndex } = state;

  const handlePop = (gig: any) => {
    currentGig(gig);
  };

  const handleDelete = (id: number) => {
    deleteGig(Number(id));
  };

  const { technologies, stack } = gig;
  const header = (
    <Flex>
      <div>
        <H2>{fullName(gig.first_name, gig.last_name)}</H2>
        <BadgeStyle bgColor={stack !== undefined && stack.split(" ")[0]}>
          {gig.stack} Developer
        </BadgeStyle>
      </div>
      <Avatar>
        {gig.profile_image ? (
          <img src={gig.profile_image} />
        ) : (
          <>
            {gig.first_name[0].toUpperCase()}
            {gig.last_name[0].toUpperCase()}
          </>
        )}
      </Avatar>
    </Flex>
  );
  const descriptions = (
    <>
      <H2>Skills</H2>
      <Ul>
        {technologies !== undefined &&
          technologies.map((technology: string, index: number) => (
            <Li key={index}>{technology}</Li>
          ))}
      </Ul>
    </>
  );
  const footer = (
    <>
      <Accordion styled style={{ width: "100%" }}>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Click To See Gig Contacts
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === 0}
          style={{ width: "100% !important" }}
        >
          <FlexFooter>
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
          </FlexFooter>
        </Accordion.Content>
      </Accordion>
      <ActionIcons>
        <Icon
          name='trash'
          color='red'
          size='big'
          onClick={() => handleDelete(gig.id)}
        />
        <Icon
          name='edit'
          color='teal'
          size='big'
          onClick={() => handlePop(gig)}
        />
      </ActionIcons>
    </>
  );
  return (
    <Grid>
      <CardStyle>
        <Card.Content header={header} />
        <Card.Content description={descriptions} />
        <Card.Content>{footer}</Card.Content>
      </CardStyle>

      <Line>
        <ModifyComponent gig={current} />
      </Line>

      <Line>
        <SelectModification gig={gig} />
      </Line>

      <Line>
        <ImageUpload gig={gig} />
      </Line>
    </Grid>
  );
};

export default List;
