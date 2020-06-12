import React, { useState, useContext } from "react";
import FormParent from "./Form";
import { Form, Button } from "semantic-ui-react";
import { IForm2 } from "../../utils/IForm";
import { UserContext } from "../../context/UserProvider";

const LoginForm = () => {
  const { loginUser } = useContext(UserContext);
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
    loginUser(values);
  };
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
          />
          <Form.Input
            fluid
            label='Password'
            placeholder='Password'
            name='password'
            onChange={handleInput}
          />
        </Form.Group>
        <Button type='submit'>Login</Button>
      </Form>
    </FormParent>
  );
};

export default LoginForm;
