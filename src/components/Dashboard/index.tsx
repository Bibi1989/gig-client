import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FormGroup, Form, Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import { GigContext } from "../../context/GigProvider";
import { IForm } from "../../utils/IForm";

// image imports
const background_image = "./assets/background1.jpg";

const Dashboard = () => {
  const { searchGigLocation } = useContext(GigContext);
  const [search, setSearch] = useState<string | undefined>("");

  const handleInput = ({ target: { value } }: IForm) => {
    searchGigLocation(value);
  };

  const onsubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div>
      <Container>
        <LandingStyle>
          <Form onSubmit={onsubmit}>
            <FormGroupStyle>
              <Input
                type='search'
                placeholder='Search for gig base on location or proficiency'
                onChange={handleInput}
              />
              <IconStyle name='search' color='orange' />
            </FormGroupStyle>
            <ButtonStyle type='submit' variant='info'>
              Search
            </ButtonStyle>
          </Form>
        </LandingStyle>
      </Container>
    </div>
  );
};

export default Dashboard;

const Container = styled.div`
  width: 100%;
`;
const LandingStyle = styled.div`
  min-height: 70vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${background_image});
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const FormGroupStyle = styled(FormGroup)`
  width: 60vw !important;
  position: relative;
`;
const Input = styled.input`
  padding: 0.8em 2em;
  width: 100%;
  border: none;
  border-radius: 0.25em;
`;
const IconStyle = styled(Icon)`
  position: absolute;
  top: 0.85em;
  left: 0.5em;
`;
const ButtonStyle = styled(Button)`
  display: block;
  border: none;
  border-radius: 0.25em;
  margin: auto;
`;
