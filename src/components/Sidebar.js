import React from "react";
import styled from "styled-components";

import colors from "../styles/colors";
import logo from "../assets/icons/256x256.png";

import Nav from "./Nav";

const SidebarBackground = styled.div`
  display: inline-block;
  position: fixed;
  width: 300px;
  height: 100vh;
  background-color: ${colors.nearblack};
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 0;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const HeaderLogo = styled.img`
  display: inline;
  width: 6rem;
  margin-right: 1rem;
`;

const HeaderTitle = styled.h1`
  display: inline;
  font-size: 4rem;
  color: ${colors.offwhite};
`;

const Sidebar = () => {
  return (
    <SidebarBackground>
      <HeaderWrapper>
        <HeaderLogo src={logo} />
        <HeaderTitle>glitcHQ</HeaderTitle>
      </HeaderWrapper>
      <Nav></Nav>
    </SidebarBackground>
  );
};

export default Sidebar;
