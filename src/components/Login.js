import React from "react";

import Head from "./Head";
import LogInForm from "./LogInForm";
import { PageHeader } from "../utils/utilComponents";

const Home = () => {
  return (
    <div>
      <Head title="login"></Head>
      <PageHeader>login</PageHeader>
      <LogInForm></LogInForm>
    </div>
  );
};

export default Home;
