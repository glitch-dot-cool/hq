import React, { Component } from "react";
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
  transition: 0.5s ease-out all;
`;

const HeaderWrapper = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const HeaderLogo = styled.img`
  display: inline;
  width: 6rem;
  margin-right: 1rem;
  transition: .5s ease-out transform;
`;

const HeaderTitle = styled.h1`
  display: inline;
  font-size: 4rem;
  color: ${colors.offwhite};
  transition: .5s ease-out transform;
`;

class Sidebar extends Component {
  state = {
    sidebarOpen: true,
    sidebarStyles: {
      transform: `translateX(0)`
    },
    headerStyles: {
      transform: `scale(1)`
    },
    logoStyles: {
      transform: `translateX(0) scale(1)`
    }
  };

  sidebarToggle = () => {
    this.setState(prevState => {
      return { sidebarOpen: !prevState.sidebarOpen };
    });

    if (this.state.sidebarOpen) {
      this.setState({
        sidebarStyles: {
          transform: `translateX(-250px)`
        },
        headerStyles: {
          transform: `scale(0)`
        },
        logoStyles: {
          transform: `translateX(195px) scale(.7)`
        }
      });
    } else {
      this.setState({
        sidebarStyles: {
          transform: `translateX(0)`
        },
        headerStyles: {
          transform: `scale(1)`
        },
        logoStyles: {
          transform: `translateX(0) scale(1)`
        }
      });
    }
  };

  render() {
    return (
      <SidebarBackground style={this.state.sidebarStyles}>
        <HeaderWrapper onClick={this.sidebarToggle}>
          <HeaderLogo src={logo} style={this.state.logoStyles} />
          <HeaderTitle style={this.state.headerStyles}>glitcHQ</HeaderTitle>
        </HeaderWrapper>
        <Nav></Nav>
      </SidebarBackground>
    );
  }
}

export default Sidebar;
