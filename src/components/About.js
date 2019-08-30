import React from "react";
import styled from "styled-components";

const Block = styled.div`
    background-color: orangered;
    width: 500px;
    height: 1200px;
`

const About = () => {
  return (
    <div>
      <h1>about</h1>
      <Block></Block>
    </div>
  );
};

export default About;
