import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Form, Select } from "semantic-ui-react";
import { IForm3 } from "../../utils/IForm";
import { states } from "../../utils/states";
import { GigContext } from "../../context/GigProvider";

const newstate = states.map((state) => {
  return {
    value: state,
    text: state[0].toUpperCase() + state.slice(1),
  };
});

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
  { value: "Typescript/Javascript", text: "Typescript/Javascript" },
  { value: "Node/Express", text: "Node/Express" },
  { value: "Reactjs", text: "Reactjs" },
  { value: "Vuejs", text: "Vuejs" },
  { value: "React Native", text: "React Native" },
];

const profs = [
  { value: "junior", text: "Junior Level" },
  { value: "mid", text: "Mid Level" },
  { value: "senior", text: "Senior Level" },
];

const Filter = () => {
  const { searchGigLocation, searchGigProficiency, searchGigTech } = useContext(
    GigContext
  );
  const setTech = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const setProf = useState<string>("");
  const handleInputTech = ({ target: { textContent } }: IForm3) => {
    setTech[1](textContent.toLowerCase());
    searchGigTech(textContent);
  };
  const handleInputLocation = ({ target: { textContent } }: IForm3) => {
    setLocation(textContent);
    searchGigLocation(textContent);
  };
  const handleInputProf = ({ target: { textContent } }: IForm3) => {
    searchGigProficiency(textContent);
    setProf[1](textContent.toLowerCase());
  };

  return (
    <Container>
      <H1>Filter Gigs</H1>
      <FormStyle>
        <Form.Field
          control={Select}
          label='Location'
          options={newstate}
          placeholder='Location'
          name='location'
          value={location}
          onChange={handleInputLocation}
        />
        <Form.Field
          control={Select}
          label='Proficiency'
          options={profs}
          placeholder='Proficiency'
          name='technologies'
          onChange={handleInputProf}
        />
        <Form.Field
          control={Select}
          label='Technologies'
          options={techs}
          placeholder='Technologies'
          name='technologies'
          onChange={handleInputTech}
        />
      </FormStyle>
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  padding: 1em 10%;

  @media (max-width: 769px) {
    padding: 1em 1em;
  }
`;
const H1 = styled.h1`
  padding: 1em 1em;
  text-align: center;
  color: #777;
`;

const FormStyle = styled(Form)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;

  @media (max-width: 769px) {
    grid-template-columns: repeat(1, 1fr);
  }

  select {
    margin-right: 1em !important;
  }
`;
