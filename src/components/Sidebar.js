import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sidebarOpen, sidebarClose } from "../actions/sidebar";

import colors from "../styles/colors";
import measurements from "../styles/measurements";
import logo from "../assets/icons/256x256.png";

import Nav from "./Nav";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

const updateBrowserView = shiftAmount => {
  ipc.send("updateBrowserView", shiftAmount);
};

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
    },
    spacerStyles: {
      transform: `translateX(0)`
    }
  };

  sidebarToggle = () => {
    this.setState(prevState => {
      return { sidebarOpen: !prevState.sidebarOpen };
    });

    if (this.props.isOpen === true) {
      this.props.sidebarClose();

      this.setState({
        sidebarStyles: {
          transform: `translateX(-250px)`
        },
        headerStyles: {
          transform: `scale(0)`
        },
        logoStyles: {
          transform: `translateX(195px) scale(.7)`
        },
        spacerStyles: {
          width: `50px`
        }
      });
      updateBrowserView(50);
    } else if (this.props.isOpen === false) {
      this.props.sidebarOpen();

      this.setState({
        sidebarStyles: {
          transform: `translateX(0)`
        },
        headerStyles: {
          transform: `scale(1)`
        },
        logoStyles: {
          transform: `translateX(0) scale(1)`
        },
        spacerStyles: {
          width: `${measurements.navWidth}px`
        }
      });
      updateBrowserView(measurements.navWidth);
    }
  };

  render() {
    return (
      <Fragment>
        <SidebarBackground style={this.state.sidebarStyles}>
          <HeaderWrapper onClick={this.sidebarToggle}>
            <HeaderLogo src={logo} style={this.state.logoStyles} />
            <HeaderTitle style={this.state.headerStyles}>glitcHQ</HeaderTitle>
          </HeaderWrapper>
          <Nav></Nav>
        </SidebarBackground>
        <Spacer style={this.state.spacerStyles}></Spacer>
      </Fragment>
    );
  }
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  sidebarOpen: PropTypes.func.isRequired,
  sidebarClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isOpen: state.sidebar.isOpen
});

export default connect(
  mapStateToProps,
  { sidebarOpen, sidebarClose }
)(Sidebar);

const SidebarBackground = styled.div`
  display: inline-block;
  position: fixed;
  width: ${measurements.navWidth}px;
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
  transition: 0.5s ease-out transform;
  z-index: 1;
`;

const HeaderTitle = styled.h1`
  display: inline;
  font-size: 4rem;
  color: ${colors.offwhite};
  transition: 0.5s ease-out transform;
  z-index: 0;
`;

const Spacer = styled.div`
  display: inline-block;
  width: ${measurements.navWidth}px;
  height: 100vh;
  pointer-events: none;
  transition: 0.5s ease-out all;
`;
