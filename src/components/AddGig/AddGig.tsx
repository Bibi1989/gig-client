import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Form, TextArea, Select } from "semantic-ui-react";
import { GigContext } from "../../context/GigProvider";
import { Button, Accordion, Card } from "react-bootstrap";
import { IForm, IForm2, IForm3 } from "../../utils/IForm";
import { states } from "../../utils/states";

const newstate = states.map((state) => {
  return {
    value: state,
    text: state[0].toUpperCase() + state.slice(1),
  };
});

const stacks = [
  { value: "frontend", text: "Front End" },
  { value: "backend", text: "Back End" },
  { value: "fullstack", text: "Full Stack" },
];
const techs = [
  { value: "javascript", text: "Javascript" },
  { value: "typescript", text: "Typescript" },
  { value: "java", text: "Java" },
  { value: "c#", text: "C#" },
  { value: "node", text: "Node" },
  { value: "react", text: "React" },
  { value: "vue", text: "Vue" },
  { value: "angular", text: "Angular" },
  { value: "php", text: "PHP" },
  { value: "android", text: "Android" },
  { value: "python", text: "Python" },
];
const profs = [
  { value: "junior", text: "Junior Level" },
  { value: "mid", text: "Mid Level" },
  { value: "senior", text: "Senior Level" },
];

const AddGig = () => {
  const { addGig } = useContext(GigContext);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    stack: "",
    password: "",
    location: "",
    yoe: "",
    github_url: "",
    linkedin_url: "",
    profile: "",
    experience: "",
  });

  const [stack, setStack] = useState("");
  const [technologies, setTech] = useState<string[]>([]);
  const [proficiency, setProf] = useState("");
  const [location, setLocation] = useState<string>("");

  const handleInput = ({ target: { name, value } }: IForm2) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleInputStack = ({ target: { textContent } }: IForm3) => {
    setStack(textContent.split(" ")[0].toLowerCase());
  };
  const handleInputTech = ({ target: { textContent } }: IForm3) => {
    setTech([...technologies, textContent.toLowerCase()]);
  };
  const handleInputProf = ({ target: { textContent } }: IForm3) => {
    setProf(textContent.split(" ")[0].toLowerCase());
  };
  const handleInputLocation = ({ target: { textContent } }: IForm3) => {
    setLocation(textContent);
  };

  console.log({ stack, technologies, proficiency });

  const onsubmit = (e: any) => {
    e.preventDefault();
    addGig({ ...values, stack, technologies, proficiency });
  };
  return (
    <Wrapper>
      <Accordion>
        <Card>
          <AccordionStyle>
            <Accordion.Toggle
              as={Button}
              variant='info'
              eventKey='1'
              style={{ width: "100%" }}
            >
              Click me to add a profile
            </Accordion.Toggle>
          </AccordionStyle>
          <Accordion.Collapse eventKey='1'>
            <Container>
              <H1>Add A Profile for Hire</H1>
              <FormStyle onSubmit={onsubmit}>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    label='First name'
                    placeholder='First name'
                    name='first_name'
                    onChange={handleInput}
                  />
                  <Form.Input
                    fluid
                    label='Last name'
                    placeholder='Last name'
                    name='last_name'
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    label='Email Address'
                    placeholder='Email Address'
                    name='email'
                    onChange={handleInput}
                  />
                  <Form.Input
                    fluid
                    label='Phone Number'
                    placeholder='Phone Number'
                    name='phone'
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    label='Password'
                    placeholder='Password'
                    name='password'
                    onChange={handleInput}
                  />
                  {/* <Form.Input
                    fluid
                    label='Location'
                    placeholder='Location'
                    name='location'
                    onChange={handleInput}
                  /> */}
                  <Form.Field
                    control={Select}
                    label='Location'
                    options={newstate}
                    placeholder='Location'
                    name='location'
                    value={location}
                    onChange={handleInputLocation}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='Profile'
                    placeholder='Profile'
                    name='profile'
                    onChange={handleInput}
                  />
                  <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='Experience'
                    placeholder='Experience'
                    name='experience'
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field
                    control={Select}
                    label='Stack'
                    options={stacks}
                    placeholder='Stack'
                    name='stacks'
                    onChange={handleInputStack}
                  />
                  <Form.Field
                    control={Select}
                    label='Technologies'
                    options={techs}
                    placeholder='Technologies'
                    name='technologies'
                    onChange={handleInputTech}
                    multiple
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field
                    control={Select}
                    label='Proficiecy'
                    options={profs}
                    placeholder='Proficiecy'
                    name='proficiency'
                    onChange={handleInputProf}
                  />
                  <Form.Input
                    fluid
                    label='Year Of Experience'
                    placeholder='Year Of Experience'
                    name='yoe'
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    label='Profile Image'
                    placeholder='Profile Image'
                  />
                  <Form.Input
                    fluid
                    label='Github'
                    placeholder='Github'
                    name='github_url'
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    label='LinkendIn'
                    placeholder='LinkendIn'
                    name='linlin_url'
                    onChange={handleInput}
                  />
                </Form.Group>
                <Button type='submit' variant='info'>
                  Add Gig Profile
                </Button>
              </FormStyle>
            </Container>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Wrapper>
  );
};

export default AddGig;

const Container = styled.div`
  padding: 2em 1em;

  @media (max-width: 769px) {
    padding: 2em 1em;
  }
`;

const H1 = styled.h1`
  text-align: center;
  padding: 1em 0;
`;

const AccordionStyle = styled(Card.Header)`
  background: #17a2b8;
  color: white;
`;
const FormStyle = styled(Form)``;
const Wrapper = styled.div`
  padding: 2em 10%;

  @media (max-width: 769px) {
    padding: 2em 1em;
  }
`;