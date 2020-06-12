import React from "react";
import styled from "styled-components";

const Form = ({ children, title }: any) => {
  return (
    <Wrapper>
      <H1>{title}</H1>
      {children}
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.div`
  width: 70%;
  margin: auto;

  @media (max-width: 769px) {
    width: 100%;
    padding: 1em;
  }
`;
const H1 = styled.h1`
  text-align: center;
  padding: 1em;
`;
