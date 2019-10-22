import React from "react";

import Head from "./Head";
import LogInForm from "./LogInForm";
import { PageHeader, Centered } from "../utils/utilComponents";
import measurements from "../styles/measurements";

const Login = () => {
  return (
    <Centered column style={{ height: `50vh` }}>
      <Head title="login"></Head>
      <PageHeader>login</PageHeader>
      <LogInForm></LogInForm>
    </Centered>
  );
};

export default Login;
