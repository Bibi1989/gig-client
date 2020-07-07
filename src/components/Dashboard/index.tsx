import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FormGroup, Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import { GigContext } from "../../context/GigProvider";
import { IForm } from "../../utils/IForm";

// image imports
const background_image = "./assets/background1.jpg";

const Dashboard = () => {
  const { searchGigLocation, fetchGig, gigs } = useContext(GigContext);
  const [search, setSearch] = useState<string | undefined>("");

  useEffect(() => {
    fetchGig();

    // eslint-disable-next-line
  }, [search, setSearch]);

  const handleInput = ({ target: { value } }: IForm) => {
    searchGigLocation(value.toLowerCase());
  };

  const onsubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div>
      <Container>
        <LandingStyle>
          <FormStyle onSubmit={onsubmit}>
            <H1>Find A DEV</H1>
            <FormGroupStyle>
              <Input
                type='search'
                placeholder='Search for dev base a location'
                onChange={handleInput}
              />
              <IconStyle name='search' color='orange' />
            </FormGroupStyle>
            <ButtonStyle type='submit' variant='info'>
              Search
            </ButtonStyle>
            {search && (
              <Overlay show={false}>
                <Ul>
                  {gigs.map((gig: any) => (
                    <Li>
                      {gig.proficiency}, {gig.location}
                    </Li>
                  ))}
                </Ul>
              </Overlay>
            )}
          </FormStyle>
        </LandingStyle>
      </Container>
    </div>
  );
};

export default Dashboard;

const Container = styled.div`
  width: 100%;
`;
const FormStyle = styled.form`
  position: relative;
`;
const Overlay = styled.div<{ show: boolean }>`
  position: absolute;
  top: 3.2em;
  left: 0;
  right: 0;
  max-height: 30vh;
  overflow-y: auto;
  display: ${(props) => (props.show ? "block" : "none")};
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

const H1 = styled.h1`
  color: orangered;
  text-align: center;
  font-weight: 700;
  padding-bottom: 1.5em;
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
const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;
const Li = styled.li`
  padding: 1em;
  margin-bottom: 0.2em;
  background: white;
`;
