import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { fullName } from "../../utils/fullName";
import { Icon, Card } from "semantic-ui-react";
import { Badge } from "react-bootstrap";
import { GigContext } from "../../context/GigProvider";
import ModifyComponent from "./ModifyComponent";

const List = ({ gig }: any) => {
  const { fetchProfileGig, currentGig, deleteGig, current } = useContext(
    GigContext
  );

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
    <FlexFooter>
      <div>
        <P>
          <Icon name='browser' /> LinkedIn:{" "}
          {gig.linkedin_url ? gig.linkedin_url : "No LinkedIn link"}
        </P>
        <P>
          <Icon name='browser' /> Github:{" "}
          {gig.github_url ? gig.github_url : "No Github link"}
        </P>
      </div>
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
    </FlexFooter>
  );
  return (
    <Grid>
      <CardStyle>
        <Card.Content header={header} />
        <Card.Content description={descriptions} />
        <Card.Content>{footer}</Card.Content>
      </CardStyle>

      <ModifyComponent gig={current} />
    </Grid>
  );
};

export default List;

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
