import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
import routes from "../routes";

const Form = styled.form``;

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
