import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TextArea, Form, Button } from "semantic-ui-react";
import { GigContext } from "../../context/GigProvider";
import { H1Style, FormInputStyle } from "../commons/style";

const ModifyComponent = ({ gig }: any) => {
  const { updateGig } = useContext(GigContext);
  const {
    first_name,
    last_name,
    email,
    phone,
    yoe,
    github_url,
    profile,
    experience,
    linkedin_url,
  } = gig;
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    yoe: "",
    github_url: "",
    linkedin_url: "",
    profile: "",
    experience: "",
  });
  useEffect(() => {
    setValues({
      first_name,
      last_name,
      email,
      phone,
      yoe,
      github_url,
      linkedin_url,
      profile,
      experience,
    });

    // eslint-disable-next-line
  }, [gig]);
  const handleInput = ({ target: { name, value } }: any) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGig(Number(gig.id), { ...gig, ...values });
    setValues({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      yoe: "",
      github_url: "",
      linkedin_url: "",
      profile: "",
      experience: "",
    });
  };
  return (
    <FormStyle onSubmit={onsubmit}>
      <H1Style>Update Profile</H1Style>
      <Form.Group widths='equal'>
        <FormInputStyle
          fluid
          label='First name'
          placeholder='First name'
          name='first_name'
          value={values.first_name}
          onChange={handleInput}
        />
        <FormInputStyle
          fluid
          label='Last name'
          placeholder='Last name'
          name='last_name'
          value={values.last_name}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <FormInputStyle
          fluid
          label='Email Address'
          placeholder='Email Address'
          name='email'
          value={values.email}
          onChange={handleInput}
        />
        <FormInputStyle
          fluid
          label='Phone Number'
          placeholder='Phone Number'
          name='phone'
          value={values.phone}
          onChange={handleInput}
        />
      </Form.Group>

      <Form.Group widths='equal'>
        <FormInputStyle
          fluid
          label='Year Of Experience'
          placeholder='Year Of Experience'
          name='yoe'
          value={values.yoe}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <FormInputStyle
          fluid
          label='Github'
          placeholder='Github'
          name='github_url'
          value={values.github_url}
          onChange={handleInput}
        />
        <FormInputStyle
          fluid
          label='LinkendIn'
          placeholder='LinkendIn'
          name='linkedin_url'
          value={values.linkedin_url}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Profile'
          placeholder='Profile'
          name='profile'
          value={values.profile}
          onChange={handleInput}
        />
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Experience'
          placeholder='Experience'
          name='experience'
          value={values.experience}
          onChange={handleInput}
        />
      </Form.Group>
      <Button type='submit' color='teal'>
        Edit Gig Profile
      </Button>
    </FormStyle>
  );
};

export default ModifyComponent;

const FormStyle = styled(Form)`
  width: 100%;
`;
