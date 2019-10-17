import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import { login } from "../actions/auth";

const Form = styled.form``;

const LogInForm = ({ setAlert, login }) => {
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
    login(email, password);

    // const user = {
    //   email,
    //   password
    // };

    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   };

    //   const body = JSON.stringify(user);

    //   const res = await axios.post("/api/auth", body, config);

    //   if (res.status === 200) {
    //     setAlert("Logged in successfully", "success");
    //   } else {
    //     setAlert("Invalid credentials", "danger");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setAlert("Server error", "danger");
    // }
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

LogInForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, login }
)(LogInForm);
