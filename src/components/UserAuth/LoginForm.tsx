import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FormParent from "./Form";
import { Form, Button } from "semantic-ui-react";
import { IForm2 } from "../../utils/IForm";
import { UserContext } from "../../context/UserProvider";
import { Spinner, Alert } from "react-bootstrap";

const LoginForm = () => {
  const { loginUser, loading, errors, invalid_password } = useContext(
    UserContext
  );
  const path = window.location.origin;
  const history = useHistory();

  const [show, setShow] = useState(true);

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

  const { email, password, invalid, network } = errors || {};
  const { error } = invalid_password || {};

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
    <FormParent title='Login Here'>
      <P show={network ? true : false}>{network !== undefined && network}</P>
      <P show={error ? true : false}>{error !== undefined && error}</P>
      {invalid && show && (!email || !password) && (
        <Alert variant='danger' onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            {errors.invalid}{" "}
            <span
              onClick={() => history.push("/register")}
              style={{
                color: "orangered",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Click here to Register
            </span>
          </p>
        </Alert>
      )}
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

const P = styled.p<{ show: boolean }>`
  color: orangered;
  text-align: center;
  padding: ${(props) => (props.show ? "1em" : "")};
  width: 100%;
  margin: auto;
  background: #f8d7da;
  border-radius: 0.25em;
  /* text-decoration: underline; */
`;
