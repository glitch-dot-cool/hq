import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import colors from "../styles/colors";
import measurements from "../styles/measurements";
import Sidebar from "./Sidebar";

const Layout = ({ sidebarIsOpen, ...props }) => {
  let contentStyles;

  sidebarIsOpen
    ? (contentStyles = {
        marginLeft: `${measurements.navWidth}px`,
        maxWidth: `calc(100vw - ${measurements.navWidth}px)`
      })
    : (contentStyles = { marginLeft: `50px`, maxWidth: `calc(100vw - 50px)` });

  return (
    <Background>
      <Sidebar></Sidebar>
      <Content style={contentStyles}>{props.children}</Content>
    </Background>
  );
};

Layout.propTypes = {
  sidebarIsOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  sidebarIsOpen: state.sidebar.isOpen
});

export default connect(mapStateToProps)(Layout);

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
  padding: ${measurements.layoutPadding}rem;
  transition: 0.5s ease-out all;
  background-color: ${colors.darkgrey};
  width: 100%;
  min-height: 100vh;
  z-index: -1;
  word-wrap: break-word;
`;
