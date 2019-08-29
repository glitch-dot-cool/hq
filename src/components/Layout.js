import React from "react";
import styled from "styled-components";

import colors from "../styles/colors";
import Sidebar from "./Sidebar";

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${colors.darkgrey};
  z-index: -1;
`;

const Layout = () => {
  return (
    <Background>
      <Sidebar></Sidebar>
    </Background>
  );
};

export default Layout;
