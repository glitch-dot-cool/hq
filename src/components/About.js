import React from "react";
import styled from "styled-components";

import Head from "./Head";

const Block = styled.div`
    background-color: orangered;
    width: 500px;
    height: 1200px;
`

const About = () => {
  return (
    <div>
      <Head title="about"></Head>
      <h1>about</h1>
      <Block></Block>
    </div>
  );
};

export default About;
