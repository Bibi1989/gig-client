import React, { useState, useContext } from "react";
import styled from "styled-components";
import FormParent from "./Form";
import { Form, Button } from "semantic-ui-react";
import { IForm2 } from "../../utils/IForm";
import { UserContext } from "../../context/UserProvider";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const RegisterForm = () => {
  const { registerUser, loading } = useContext(UserContext);
  const history = useHistory();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleInput = ({ target: { name, value } }: IForm2) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onsubmit = (e: React.FormEvent) => {
    registerUser(values, history);
  };

  if (loading) {
    return (
      <LoadComp>
        <Spinner
          animation='border'
          variant='info'
          style={{ width: "70px", height: "70px" }}
        />
      </LoadComp>
    );
  }
  return (
    <FormParent title='Register User'>
      <Form onSubmit={onsubmit}>
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
            label='Password'
            placeholder='Password'
            name='password'
            onChange={handleInput}
          />
        </Form.Group>
        <Button type='submit'>Register</Button>
      </Form>
    </FormParent>
  );
};

export default RegisterForm;

const LoadComp = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
