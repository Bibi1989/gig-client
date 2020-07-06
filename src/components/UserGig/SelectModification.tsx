import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Form, Button, Select } from "semantic-ui-react";
import { states } from "../../utils/states";
import { IForm3 } from "../../utils/IForm";
import { GigContext } from "../../context/GigProvider";
import { Alert } from "react-bootstrap";
import { H1Style } from "../commons/style";

const newstate = states.map((state) => {
  return {
    value: state,
    text: state[0].toUpperCase() + state.slice(1),
  };
});

const stacks = [
  { value: "Front End", text: "Front End" },
  { value: "Back End", text: "Back End" },
  { value: "Full Stack", text: "Full Stack" },
];
const techs = [
  { value: "Javascript", text: "Javascript" },
  { value: "Typescript", text: "Typescript" },
  { value: "Java", text: "Java" },
  { value: "C Sharp", text: "C Sharp" },
  { value: "Node", text: "Node" },
  { value: "Reactjs", text: "Reactjs" },
  { value: "Vuejs", text: "Vuejs" },
  { value: "Angular", text: "Angular" },
  { value: "PHP", text: "PHP" },
  { value: "Android", text: "Android" },
  { value: "Python", text: "Python" },
];
const profs = [
  { value: "Junior Level", text: "Junior Level" },
  { value: "Mid Level", text: "Mid Level" },
  { value: "Senior Level", text: "Senior Level" },
];

const SelectModification = ({ gig }: any) => {
  const { updateGig, skillError, setSkillError } = useContext(GigContext);
  const [stack, setStack] = useState("");
  const [technologies, setTech] = useState<string[]>([]);
  const [proficiency, setProf] = useState("");
  const [location, setLocation] = useState<string>("");

  const [show, setShow] = useState(false);

  const handleInputStack = ({ target: { textContent } }: IForm3) => {
    setStack(textContent);
  };
  const handleInputTech = ({ target: { textContent } }: IForm3) => {
    setTech([...technologies, textContent]);
  };
  const handleInputProf = ({ target: { textContent } }: IForm3) => {
    setProf(textContent);
  };
  const handleInputLocation = ({ target: { textContent } }: IForm3) => {
    setLocation(textContent);
  };

  useEffect(() => {
    if (skillError) {
      setShow(true);
    }

    // eslint-disable-next-line
  }, []);

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSkillError(false);
    updateGig(gig.id, { ...gig, technologies, stack, location, proficiency });
  };
  return (
    <FormStyle onSubmit={onsubmit}>
      <H1Style>Update Skill and Location</H1Style>
      <>
        {show && (
          <Alert variant='danger' onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>A Field is empty!!!</p>
          </Alert>
        )}
      </>
      <Form.Field
        control={Select}
        label='Location'
        options={newstate}
        placeholder='Location'
        name='location'
        onChange={handleInputLocation}
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
      <Form.Field
        control={Select}
        label='Stack'
        options={stacks}
        placeholder='Stack'
        name='stack'
        onChange={handleInputStack}
      />
      <Form.Field
        control={Select}
        label='Proficiency'
        options={profs}
        placeholder='Proficiency'
        name='proficiency'
        onChange={handleInputProf}
      />
      <Button
        type='submit'
        style={{ marginTop: "1em", background: "#00B5AD", color: "white" }}
      >
        Update
      </Button>
    </FormStyle>
  );
};

export default SelectModification;

const FormStyle = styled(Form)`
  width: 100%;
`;
