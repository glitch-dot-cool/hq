import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
import routes from "../routes";

import colors from "../styles/colors";

const LogInForm = ({ setAlert, login, isAuthenticated }) => {
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
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to={`${routes.dashboard.path}`}></Redirect>;
  }

  return (
    <Fragment>
      <Form onSubmit={e => onSubmit(e)}>
        <FormLabel htmlFor="email">email</FormLabel>
        <FormField
          type="text"
          name="email"
          onChange={e => onChange(e)}
          required
        />
        <FormLabel htmlFor="password">password</FormLabel>
        <FormField
          type="password"
          name="password"
          onChange={e => onChange(e)}
          required
        />
        <SubmitButton type="submit" value="login" />
      </Form>
    </Fragment>
  );
};

const Form = styled.form``;

const FormLabel = styled.label`
  display: block;
  color: ${colors.offwhite};
`;

const FormField = styled.input`
  display: block;
  font-size: 2rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

const SubmitButton = styled.input`
  font-size: 2rem;
  padding: 0.5rem;
  border: none;
  background-color: ${colors.midgrey};
  color: ${colors.offwhite};
  transition: 0.2s ease-out all;

  &:hover {
    color: ${colors.nearblack};
    background-color: ${colors.lightgrey};
    cursor: pointer;
  }
`;

LogInForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, login }
)(LogInForm);
