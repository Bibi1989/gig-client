import styled from "styled-components";
import { Card } from "semantic-ui-react";
import { Badge } from "react-bootstrap";

export const Grid = styled.div`
  margin-bottom: 1em;
`;
export const Flex = styled.div`
  display: flex;
  position: relative;
`;
export const H2 = styled.h2`
  color: #555555;
`;
export const P = styled.p`
  color: #888;
`;
export const Ul = styled.ul`
  color: #888;
`;
export const Li = styled.li`
  color: #888;
`;
export const FlexFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ActionIcons = styled.div`
  margin-top: 0.7em;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  i {
    display: inline;
  }

  i:first-child {
    margin-right: 1em;
  }
`;

export const CardStyle = styled(Card)`
  width: 100% !important;
`;

export const BadgeStyle = styled(Badge)`
  padding: 0.5em !important;
  background: ${({ bgColor }) =>
    bgColor === "Front"
      ? "orangered"
      : bgColor === "Back"
      ? "teal"
      : bgColor === "Full" && "blue"};
  color: white;
`;
export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  color: white;
  font-size: 3em;
  border-radius: 50%;
  position: absolute;
  bottom: -80%;
  left: 50%;
  transform: translateX(-50%);
  background: teal;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

export const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2em 0;
  border-top: 1px solid #ccc;
  margin-top: 3em;
`;

export const H1Style = styled.h1`
  padding: 1em 0;
  color: #777777;
  text-align: center;
`;
