import React from "react";
import styled from "styled-components";

import colors from "../styles/colors";
import measurements from "../styles/measurements"
import Sidebar from "./Sidebar";

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.darkgrey};
  z-index: -1;
`;

const Content = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const Spacer = styled.div`
  display: inline-block;
  width: ${measurements.navWidth}px;
  height: 100vh;
`;

const Layout = props => {
  return (
    <Background>
      <Sidebar></Sidebar>
      <Spacer></Spacer>
      <Content>{props.children}</Content>
    </Background>
  );
};

export default Layout;
