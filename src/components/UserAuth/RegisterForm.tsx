import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FormParent from "./Form";
import { Form, Button } from "semantic-ui-react";
import { IForm2 } from "../../utils/IForm";
import { UserContext } from "../../context/UserProvider";
import { Spinner, Alert } from "react-bootstrap";

const RegisterForm = () => {
  const { registerUser, loading, errors } = useContext(UserContext);
  const history = useHistory();
  const [show, setShow] = useState(true);
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

  const { first_name, last_name, email, password, invalid } = errors || [];

  useEffect(() => {
    if (invalid) setShow(true);
  }, [errors]);

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
      {invalid && show && (!email || !password) && (
        <Alert variant='danger' onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            {errors.invalid}{" "}
            <span
              onClick={() => history.push("/login")}
              style={{
                color: "orangered",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Click here to Login
            </span>
          </p>
        </Alert>
      )}
      <Form onSubmit={onsubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='First name'
            placeholder='First name'
            name='first_name'
            value={values.first_name}
            onChange={handleInput}
            error={first_name ? { content: first_name } : false}
          />
          <Form.Input
            fluid
            label='Last name'
            placeholder='Last name'
            name='last_name'
            value={values.last_name}
            onChange={handleInput}
            error={last_name ? { content: last_name } : false}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Email Address'
            placeholder='Email Address'
            name='email'
            value={values.email}
            onChange={handleInput}
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
