import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import colors from "../styles/colors";
import routes from "../routes";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

const Nav = () => {
  return (
    <SidebarNavLinksWrapper>
      <SideBarNavLinks>
        <SideBarNavLink
          to={routes.home.path}
          exact={true}
          onClick={() => sendToMainProcess(routes.home.url)}
        >
          home
        </SideBarNavLink>
        <SideBarNavLink
          to={routes.about.path}
          onClick={() => sendToMainProcess(routes.about.url)}
        >
          about
        </SideBarNavLink>
        <SideBarNavLink
          to="/jhkasdfjklas"
          onClick={() => sendToMainProcess(routes.about.url)}
        >
          non-existent path
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

export default Nav;
