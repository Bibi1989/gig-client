import React from "react";
import { Card } from "semantic-ui-react";

import { fullName } from "../../utils/fullName";
import { ShowContacts } from "./AuthGigList";
import {
  BadgeStyle,
  CardStyle,
  Flex,
  H2,
  Ul,
  Li,
  Grid,
  Avatar,
} from "../commons/style";

const GigList = ({ gig }: any) => {
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
    <>
      <ShowContacts gig={gig} />
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
