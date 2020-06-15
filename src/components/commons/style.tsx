import styled from "styled-components";
import { Card, Form } from "semantic-ui-react";
import { Badge } from "react-bootstrap";

const avatar = "./assets/avatar6.png";

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
      : bgColor === "Full" && "#17A2B8"};
  color: white;
`;
export const Avatar = styled.div<{ width: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "70px")};
  height: ${(props) => (props.width ? props.width : "70px")};
  color: white;
  font-size: ${(props) => (props.width === "35px" ? "1em" : "3em")};
  border-radius: 50%;
  position: absolute;
  bottom: -80%;
  left: 50%;
  transform: translateX(-50%);
  background: url(${avatar});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

export const FormInputStyle = styled(Form.Input)`
  position: relative;
  input {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
  }
`;
