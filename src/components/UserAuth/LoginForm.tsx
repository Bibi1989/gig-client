import React, { useState, useContext } from "react";
import styled from "styled-components";
import FormParent from "./Form";
import { Form, Button } from "semantic-ui-react";
import { IForm2 } from "../../utils/IForm";
import { UserContext } from "../../context/UserProvider";
import { Spinner } from "react-bootstrap";

const LoginForm = () => {
  const { loginUser, loading, errors } = useContext(UserContext);
  const path = window.location.origin;

  const [values, setValues] = useState({
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
    loginUser(values, path);
  };

  const { email, password } = errors || [];

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
    <FormParent title='Login Here'>
      <Form onSubmit={onsubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Email Address'
            placeholder='Email Address'
            name='email'
            onChange={handleInput}
            value={values.email}
            error={email ? { content: email } : false}
          />
          <Form.Input
            fluid
            label='Password'
            placeholder='Password'
            name='password'
            value={values.password}
            onChange={handleInput}
            error={password ? { content: password } : false}
          />
        </Form.Group>
        <Button type='submit'>Login</Button>
      </Form>
    </FormParent>
  );
};

export default LoginForm;

export const LoadComp = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
