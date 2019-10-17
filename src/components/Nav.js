import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

import colors from "../styles/colors";
import routes from "../routes";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

const Nav = ({ auth: { isAuthenticated, loading }, logout }) => {
  const privateLinks = (
    <Fragment>
      <SideBarNavLink
        to={routes.dashboard.path}
        onClick={() => sendToMainProcess(routes.dashboard.url)}
      >
        dashboard
      </SideBarNavLink>
      <SideBarNavLink
        to={routes.trello.path}
        onClick={() => sendToMainProcess(routes.trello.url)}
      >
        trello
      </SideBarNavLink>
      <SideBarNavLink
        to={routes.github.path}
        onClick={() => sendToMainProcess(routes.github.url)}
      >
        github
      </SideBarNavLink>
      <SideBarNavLink
        to={"/"}
        exact={true}
        onClick={() => {
          logout();
          sendToMainProcess(routes.login.path);
        }}
      >
        logout
      </SideBarNavLink>
    </Fragment>
  );

  const publicLinks = (
    <Fragment>
      <SideBarNavLink
        to={routes.login.path}
        exact={true}
        onClick={() => sendToMainProcess(routes.login.url)}
      >
        login
      </SideBarNavLink>
    </Fragment>
  );

  return (
    <SidebarNavLinksWrapper>
      <SideBarNavLinks>
        {isAuthenticated ? privateLinks : publicLinks}
      </SideBarNavLinks>
    </SidebarNavLinksWrapper>
  );
};

const sendToMainProcess = route => {
  ipc.send("changeRoute", route);
};

const SidebarNavLinksWrapper = styled.div``;

const SideBarNavLinks = styled.nav`
  padding: 2rem;
`;

const SideBarNavLink = styled(NavLink)`
  display: block;
  font-size: 3rem;
  color: ${colors.lightgrey};
  text-decoration: none;

  :hover {
    color: ${colors.offwhite};
    cursor: pointer;
    background-color: ${colors.darkgrey};
  }

  &.active {
    text-decoration: line-through;
  }
`;

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
