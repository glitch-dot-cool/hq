import React, { Fragment, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form``;

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(user);

      const res = await axios.post("/api/auth", body, config);

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <Form onSubmit={e => onSubmit(e)}>
        <input type="text" name="email" onChange={e => onChange(e)} required />
        <input
          type="password"
          name="password"
          onChange={e => onChange(e)}
          required
        />
        <input type="submit" value="Submit" />
      </Form>
    </Fragment>
  );
};

export default LogInForm;
